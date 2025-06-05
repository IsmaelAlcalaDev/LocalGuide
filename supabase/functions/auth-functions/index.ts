// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "npm:@supabase/functions-js@2.3.5";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

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

    if (path === "login" && req.method === "POST") {
      const { email, password, userType } = await req.json();
      
      if (!email || !password || !userType) {
        return new Response(
          JSON.stringify({ error: "Email, password, and userType are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      let table;
      if (userType === "guide") {
        table = "guide";
      } else if (userType === "tourist") {
        table = "tourist";
      } else if (userType === "admin") {
        table = "administrator";
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid user type" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check if user exists with email and password
      const { data, error } = await supabaseAdmin
        .from(table)
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        return new Response(
          JSON.stringify({ error: "Invalid credentials" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Create a session for the user
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          id: data.id,
          name: data.name,
          type_user: data.type_user || userType
        }
      });

      if (authError) {
        // If user already exists in auth, sign them in
        const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          return new Response(
            JSON.stringify({ error: "Authentication error" }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(
          JSON.stringify(data),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (path === "register" && req.method === "POST") {
      const userData = await req.json();
      const { userType } = userData;
      
      if (!userType) {
        return new Response(
          JSON.stringify({ error: "User type is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      let table;
      if (userType === "guide") {
        table = "guide";
      } else if (userType === "tourist") {
        table = "tourist";
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid user type" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check if email already exists
      const { data: existingUser } = await supabaseAdmin
        .from(table)
        .select("email")
        .eq("email", userData.email)
        .single();

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "Email already exists" }),
          {
            status: 409,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Insert the new user
      const { data, error } = await supabaseAdmin
        .from(table)
        .insert([userData])
        .select()
        .single();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Create auth user
      const { error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          id: data.id,
          name: data.name,
          type_user: data.type_user || userType
        }
      });

      if (authError) {
        // If there's an error creating the auth user, delete the user from the table
        await supabaseAdmin.from(table).delete().eq("id", data.id);
        
        return new Response(
          JSON.stringify({ error: authError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 201,
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