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

    if (path === "top-rated" && req.method === "GET") {
      // Get top rated guides
      const { data, error } = await supabaseAdmin
        .from('reservation')
        .select(`
          guide_id,
          review_score,
          guide:guide_id (
            id,
            name,
            country,
            city,
            profile_img,
            phrase,
            hourly_price
          )
        `)
        .eq('status', 'ACEPTADA')
        .eq('deleted', false)
        .gte('review_score', 3)
        .order('review_score', { ascending: false });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Process data to get unique guides with average score and reservation count
      const guidesMap = new Map();
      
      data.forEach(item => {
        if (!item.guide) return;
        
        const guideId = item.guide.id;
        if (!guidesMap.has(guideId)) {
          guidesMap.set(guideId, {
            ...item.guide,
            totalReservations: 1,
            totalScore: item.review_score,
          });
        } else {
          const guide = guidesMap.get(guideId);
          guide.totalReservations += 1;
          guide.totalScore += item.review_score;
        }
      });

      // Convert to array and calculate average score
      const topRatedGuides = Array.from(guidesMap.values()).map(guide => ({
        id: guide.id,
        name: guide.name,
        country: guide.country,
        city: guide.city,
        profileImg: guide.profile_img,
        phrase: guide.phrase,
        hourlyPrice: guide.hourly_price,
        totalReservations: guide.totalReservations,
        averageScore: Math.round(guide.totalScore / guide.totalReservations)
      }));

      // Sort by average score and limit to 10
      topRatedGuides.sort((a, b) => b.averageScore - a.averageScore);
      const result = topRatedGuides.slice(0, 10);

      return new Response(
        JSON.stringify(result),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (path === "detail" && req.method === "GET") {
      const guideId = params.get('id');
      
      if (!guideId) {
        return new Response(
          JSON.stringify({ error: "Guide ID is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Get guide details
      const { data: guide, error: guideError } = await supabaseAdmin
        .from('guide')
        .select('*')
        .eq('id', guideId)
        .single();

      if (guideError) {
        return new Response(
          JSON.stringify({ error: guideError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Get guide languages
      const { data: guideLanguages, error: languagesError } = await supabaseAdmin
        .from('guide_language')
        .select(`
          language:language_id (
            language
          )
        `)
        .eq('guide_id', guideId);

      if (languagesError) {
        return new Response(
          JSON.stringify({ error: languagesError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Get guide hobbies
      const { data: guideHobbies, error: hobbiesError } = await supabaseAdmin
        .from('guide_hobbies')
        .select(`
          hobby:hobbies_id (
            name
          )
        `)
        .eq('guide_id', guideId);

      if (hobbiesError) {
        return new Response(
          JSON.stringify({ error: hobbiesError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Format the response
      const languages = guideLanguages.map(item => item.language.language);
      const hobbies = guideHobbies.map(item => item.hobby.name);

      const guideDetails = {
        id: guide.id,
        name: guide.name,
        surname: guide.surname,
        country: guide.country,
        city: guide.city,
        gender: guide.gender,
        phone: guide.phone,
        profileImg: guide.profile_img,
        email: guide.email,
        backgroundCheckCertificate: guide.background_check_certificate,
        identityDocument: guide.identity_document,
        hourlyPrice: guide.hourly_price,
        additionalInfo: guide.additional_info,
        phrase: guide.phrase,
        typeUser: guide.type_user,
        languages,
        hobbies
      };

      return new Response(
        JSON.stringify(guideDetails),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (path === "filter" && req.method === "GET") {
      const guideName = params.get('guideName');
      const country = params.get('country');
      const city = params.get('city');
      const priceMin = params.get('priceMin');
      const priceMax = params.get('priceMax');
      const gender = params.get('gender');
      const languages = params.getAll('languages');
      const hobbies = params.getAll('hobbies');

      let query = supabaseAdmin
        .from('guide')
        .select('*');

      // Apply filters
      if (guideName) {
        query = query.eq('name', guideName);
      }
      
      if (country) {
        query = query.eq('country', country);
      }
      
      if (city) {
        query = query.eq('city', city);
      }
      
      if (priceMin) {
        query = query.gte('hourly_price', priceMin);
      }
      
      if (priceMax) {
        query = query.lte('hourly_price', priceMax);
      }
      
      if (gender) {
        query = query.eq('gender', gender);
      }

      // Get filtered guides
      const { data: guides, error: guidesError } = await query;

      if (guidesError) {
        return new Response(
          JSON.stringify({ error: guidesError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Filter by languages and hobbies if needed
      let filteredGuides = guides;
      
      if (languages.length > 0 || hobbies.length > 0) {
        // Get all guide_language entries
        const { data: allGuideLanguages } = await supabaseAdmin
          .from('guide_language')
          .select('guide_id, language:language_id(language)');
          
        // Get all guide_hobbies entries
        const { data: allGuideHobbies } = await supabaseAdmin
          .from('guide_hobbies')
          .select('guide_id, hobby:hobbies_id(name)');
          
        // Create maps for quick lookup
        const guideLanguagesMap = new Map();
        const guideHobbiesMap = new Map();
        
        allGuideLanguages.forEach(entry => {
          if (!guideLanguagesMap.has(entry.guide_id)) {
            guideLanguagesMap.set(entry.guide_id, []);
          }
          guideLanguagesMap.get(entry.guide_id).push(entry.language.language);
        });
        
        allGuideHobbies.forEach(entry => {
          if (!guideHobbiesMap.has(entry.guide_id)) {
            guideHobbiesMap.set(entry.guide_id, []);
          }
          guideHobbiesMap.get(entry.guide_id).push(entry.hobby.name);
        });
        
        // Filter guides by languages and hobbies
        filteredGuides = guides.filter(guide => {
          const guideId = guide.id;
          const guideLanguages = guideLanguagesMap.get(guideId) || [];
          const guideHobbies = guideHobbiesMap.get(guideId) || [];
          
          const hasLanguages = languages.length === 0 || 
            languages.some(lang => guideLanguages.includes(lang));
            
          const hasHobbies = hobbies.length === 0 || 
            hobbies.some(hobby => guideHobbies.includes(hobby));
            
          return hasLanguages && hasHobbies;
        });
      }

      // Get reservation data for each guide
      const guideIds = filteredGuides.map(guide => guide.id);
      
      const { data: reservations } = await supabaseAdmin
        .from('reservation')
        .select('guide_id, review_score')
        .in('guide_id', guideIds)
        .eq('status', 'ACEPTADA')
        .eq('deleted', false);
        
      // Calculate total reservations and average score for each guide
      const guideStats = {};
      
      reservations.forEach(reservation => {
        const guideId = reservation.guide_id;
        
        if (!guideStats[guideId]) {
          guideStats[guideId] = {
            totalReservations: 0,
            totalScore: 0
          };
        }
        
        guideStats[guideId].totalReservations += 1;
        
        if (reservation.review_score) {
          guideStats[guideId].totalScore += reservation.review_score;
        }
      });
      
      // Format the response
      const result = filteredGuides.map(guide => {
        const stats = guideStats[guide.id] || { totalReservations: 0, totalScore: 0 };
        const averageScore = stats.totalReservations > 0 
          ? Math.round(stats.totalScore / stats.totalReservations) 
          : 0;
          
        return {
          id: guide.id,
          name: guide.name,
          country: guide.country,
          city: guide.city,
          profileImg: guide.profile_img,
          phrase: guide.phrase,
          hourlyPrice: guide.hourly_price,
          totalReservations: stats.totalReservations,
          averageScore
        };
      });

      return new Response(
        JSON.stringify(result),
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