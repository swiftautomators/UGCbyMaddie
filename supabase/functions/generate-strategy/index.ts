// supabase/functions/generate-strategy/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { product } = await req.json();

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'GEMINI_API_KEY is not configured',
                isFallback: true,
                hook: "Show the product in use with a high-impact 'Wait, I didn't know it could do that' sound.",
                angle: "Utility-focused direct response with native TikTok UI overlays (Edge Fallback).",
                why: "Social proof combined with a pattern interrupt works best for low-ticket affiliate impulse buys."
            }), {
                status: 200, // Return 200 with fallback so UI can handle it
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Act as Maddie, a world-class performance UGC strategist. 
    A brand has approached you with this product: "${product}".
    Create a 3-part UGC strategy for a TikTok Shop video in JSON format.
    JSON keys: "hook" (A 3-second visual/audio hook), "angle" (The performance marketing angle), "why" (Brief explanation of why this will convert).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Basic JSON extraction from AI response
        let cleanedJson = text;
        if (text.includes('```json')) {
            cleanedJson = text.split('```json')[1]?.split('```')[0]?.trim() || text;
        } else if (text.includes('```')) {
            cleanedJson = text.split('```')[1]?.split('```')[0]?.trim() || text;
        }

        try {
            const jsonResponse = JSON.parse(cleanedJson);
            return new Response(
                JSON.stringify({ ...jsonResponse, isFallback: false }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError, "Original text:", text);
            return new Response(
                JSON.stringify({
                    hook: "Show the product in use with a high-impact 'Wait, I didn't know it could do that' sound.",
                    angle: "Utility-focused direct response with native TikTok UI overlays (Parse Fallback).",
                    why: "A pattern interrupt works best for low-ticket affiliate impulse buys.",
                    isFallback: true,
                    rawResponse: text.substring(0, 100)
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

    } catch (error) {
        console.error("Edge Function Error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

});
