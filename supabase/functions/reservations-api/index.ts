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
    const params = url.searchParams;

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

    if (path === "recent" && req.method === "GET") {
      // Get recent reservations with high reviews
      const { data, error } = await supabaseAdmin
        .from('reservation')
        .select(`
          id,
          guide:guide_id (
            id,
            name,
            country,
            city,
            profile_img
          ),
          tourist:tourist_id (
            id,
            name,
            country,
            city,
            profile_img
          ),
          review,
          review_score,
          reserved_hours
        `)
        .eq('status', 'ACEPTADA')
        .not('review', 'is', null)
        .gte('review_score', 3)
        .order('reserved_hours', { ascending: false })
        .limit(6);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Format the response
      const recentReservations = data.map(item => ({
        guideName: item.guide.name,
        touristName: item.tourist.name,
        country: item.tourist.country,
        city: item.tourist.city,
        profileImgGuide: item.guide.profile_img,
        profileImgTourist: item.tourist.profile_img,
        review: item.review,
        reviewScore: item.review_score
      }));

      return new Response(
        JSON.stringify(recentReservations),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (path === "process" && req.method === "POST") {
      const reservationData = await req.json();
      
      // Validate reservation data
      if (!reservationData.tourist || !reservationData.guide || 
          !reservationData.startDate || !reservationData.endDate || 
          !reservationData.reservedHours || !reservationData.totalPrice ||
          !reservationData.paymentType) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Get guide hourly price for validation
      const { data: guide, error: guideError } = await supabaseAdmin
        .from('guide')
        .select('hourly_price')
        .eq('id', reservationData.guide)
        .single();

      if (guideError || !guide) {
        return new Response(
          JSON.stringify({ error: "Guide not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Validate price calculation
      const hourlyPrice = guide.hourly_price;
      const reservedHours = reservationData.reservedHours;
      const commission = 5; // 5% commission
      const calculatedPrice = (hourlyPrice * reservedHours) + ((hourlyPrice * reservedHours) * commission / 100);
      
      if (Math.abs(calculatedPrice - reservationData.totalPrice) > 0.01) {
        return new Response(
          JSON.stringify({ error: "Price calculation mismatch" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Insert reservation
      const { data: reservation, error: reservationError } = await supabaseAdmin
        .from('reservation')
        .insert([{
          tourist_id: reservationData.tourist,
          guide_id: reservationData.guide,
          reservation_date: new Date().toISOString(),
          start_date: reservationData.startDate,
          end_date: reservationData.endDate,
          status: 'ACEPTADA',
          reserved_hours: reservationData.reservedHours,
          price: reservationData.totalPrice,
          deleted: false
        }])
        .select()
        .single();

      if (reservationError) {
        return new Response(
          JSON.stringify({ error: reservationError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Insert transaction
      const { error: transactionError } = await supabaseAdmin
        .from('transaction')
        .insert([{
          amount: reservationData.totalPrice,
          type: 'RESERVA',
          payment_type: reservationData.paymentType,
          transaction_date: new Date().toISOString(),
          reservation_id: reservation.id
        }]);

      if (transactionError) {
        // If transaction fails, delete the reservation
        await supabaseAdmin
          .from('reservation')
          .delete()
          .eq('id', reservation.id);
          
        return new Response(
          JSON.stringify({ error: transactionError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ message: "Reservation processed successfully" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (path === "reviews" && req.method === "GET") {
      const guideId = params.get('guideId');
      const touristId = params.get('touristId');
      
      if (!guideId && !touristId) {
        return new Response(
          JSON.stringify({ error: "Either guideId or touristId is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      let query = supabaseAdmin
        .from('reservation')
        .select(`
          id,
          reservation_date,
          review,
          review_score
        `)
        .not('review', 'is', null);

      if (guideId) {
        query = query.eq('guide_id', guideId);
        
        // Join with tourist table for guide reviews
        query = supabaseAdmin
          .from('reservation')
          .select(`
            id,
            reservation_date,
            review,
            review_score,
            tourist:tourist_id (
              name,
              country,
              city,
              profile_img
            )
          `)
          .eq('guide_id', guideId)
          .not('review', 'is', null);
      } else if (touristId) {
        // Join with guide table for tourist reviews
        query = supabaseAdmin
          .from('reservation')
          .select(`
            id,
            reservation_date,
            review,
            review_score,
            guide:guide_id (
              name,
              country,
              city,
              profile_img
            )
          `)
          .eq('tourist_id', touristId)
          .not('review', 'is', null);
      }

      const { data, error } = await query;

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Format the response
      const reviews = data.map(item => {
        if (guideId) {
          return {
            id: item.id,
            name: item.tourist.name,
            country: item.tourist.country,
            city: item.tourist.city,
            reservationDate: item.reservation_date,
            profileImg: item.tourist.profile_img,
            review: item.review,
            reviewScore: item.review_score
          };
        } else {
          return {
            id: item.id,
            name: item.guide.name,
            country: item.guide.country,
            city: item.guide.city,
            reservationDate: item.reservation_date,
            profileImg: item.guide.profile_img,
            review: item.review,
            reviewScore: item.review_score
          };
        }
      });

      return new Response(
        JSON.stringify(reviews),
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