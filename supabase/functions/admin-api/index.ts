// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "npm:@supabase/functions-js@latest";
import { createClient } from "npm:@supabase/supabase-js@latest";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the service role client to perform admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    if (path === "kpis" && req.method === "GET") {
      // Calculate KPIs
      
      // 1. Total transactions year to date
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1).toISOString(); // Jan 1 of current year
      const endDate = new Date(currentYear, 11, 31, 23, 59, 59).toISOString(); // Dec 31 of current year
      
      const { data: yearTransactions, error: yearError } = await supabaseAdmin
        .from('transaction')
        .select('amount')
        .gte('transaction_date', startDate)
        .lte('transaction_date', endDate);
        
      if (yearError) {
        return new Response(
          JSON.stringify({ error: yearError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const totalTransactionsYearToDate = yearTransactions.reduce((sum, t) => sum + (t.amount * 0.05), 0);
      
      // 2. Total transactions current month
      const currentMonth = new Date().getMonth();
      const currentMonthStart = new Date(currentYear, currentMonth, 1).toISOString();
      const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59).toISOString();
      
      const { data: monthTransactions, error: monthError } = await supabaseAdmin
        .from('transaction')
        .select('amount')
        .gte('transaction_date', currentMonthStart)
        .lte('transaction_date', currentMonthEnd);
        
      if (monthError) {
        return new Response(
          JSON.stringify({ error: monthError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const totalTransactionsCurrentMonth = monthTransactions.reduce((sum, t) => sum + (t.amount * 0.05), 0);
      
      // 3. Total accepted reservations
      const { count: totalAcceptedReservations, error: reservationsError } = await supabaseAdmin
        .from('reservation')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ACEPTADA');
        
      if (reservationsError) {
        return new Response(
          JSON.stringify({ error: reservationsError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // 4. Total accepted reservations current month
      const { count: totalAcceptedReservationsCurrentMonth, error: monthReservationsError } = await supabaseAdmin
        .from('reservation')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'ACEPTADA')
        .gte('reservation_date', currentMonthStart)
        .lte('reservation_date', currentMonthEnd);
        
      if (monthReservationsError) {
        return new Response(
          JSON.stringify({ error: monthReservationsError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // 5. Total users
      const { count: totalGuides, error: guidesError } = await supabaseAdmin
        .from('guide')
        .select('*', { count: 'exact', head: true });
        
      if (guidesError) {
        return new Response(
          JSON.stringify({ error: guidesError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const { count: totalTourists, error: touristsError } = await supabaseAdmin
        .from('tourist')
        .select('*', { count: 'exact', head: true });
        
      if (touristsError) {
        return new Response(
          JSON.stringify({ error: touristsError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const totalUsers = totalGuides + totalTourists;
      
      // 6. Most reserved country by guide
      const { data: reservationsByGuide, error: reservationsByGuideError } = await supabaseAdmin
        .from('reservation')
        .select('guide_id, count')
        .eq('status', 'ACEPTADA')
        .eq('deleted', false)
        .group('guide_id')
        .order('count', { ascending: false })
        .limit(1);
        
      if (reservationsByGuideError) {
        return new Response(
          JSON.stringify({ error: reservationsByGuideError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      let mostReservedCountryByGuide = "Unknown";
      
      if (reservationsByGuide.length > 0) {
        const mostFrequentGuideId = reservationsByGuide[0].guide_id;
        
        const { data: guideData, error: guideDataError } = await supabaseAdmin
          .from('guide')
          .select('country')
          .eq('id', mostFrequentGuideId)
          .single();
          
        if (!guideDataError && guideData) {
          mostReservedCountryByGuide = guideData.country;
        }
      }
      
      // Compile all KPIs
      const dashboardData = {
        totalTransactionsYearToDate,
        totalTransactionsCurrentMonth,
        totalAcceptedReservations,
        totalAcceptedReservationsCurrentMonth,
        totalUsers,
        mostReservedCountryByGuide
      };

      return new Response(
        JSON.stringify(dashboardData),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});