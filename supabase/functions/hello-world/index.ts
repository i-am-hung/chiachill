import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve((_req) => {
  
  return new Response("Xin chào từ Edge Function 🎉", {
    headers: { "Content-Type": "text/plain" },
  });
});
