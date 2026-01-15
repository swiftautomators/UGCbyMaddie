"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateStrategyAction(product: string) {
    if (!product || product.trim().length === 0) {
        throw new Error("Product description is required");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not set");
        // Fallback with annotation for development detection
        return {
            hook: "Show the product in use with a high-impact 'Wait, I didn't know it could do that' sound.",
            angle: "Utility-focused direct response with native TikTok UI overlays (Development Fallback).",
            why: "Social proof combined with a pattern interrupt works best for low-ticket affiliate impulse buys.",
            isFallback: true,
            message: "Missing GEMINI_API_KEY. Using mock performance data."
        };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Act as Maddie, a world-class performance UGC strategist. 
    A brand has approached you with this product: "${product}".
    Create a 3-part UGC strategy for a TikTok Shop video in JSON format.
    JSON keys: "hook" (A 3-second visual/audio hook), "angle" (The performance marketing angle), "why" (Brief explanation of why this will convert).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const { parseAIResponse } = await import('@/lib/utils');
        return { ...parseAIResponse(text), isFallback: false };
    } catch (error) {
        console.error("AI Strategy Generation Error:", error);
        throw new Error("Failed to generate strategy. Please try again.");
    }
}

export async function submitInquiryAction(data: {
    email: string;
    project_type: string;
    budget_tier: string;
    details: Record<string, unknown>;
}) {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Critical: SUPABASE_SERVICE_ROLE_KEY or URL is not configured. SubmitInquiryAction aborted.");
    }

    // Basic runtime validation
    if (!data.email.includes('@')) {
        throw new Error("Invalid submission data.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
        .from('submissions')
        .insert([
            {
                email: data.email,
                project_type: data.project_type,
                budget_tier: data.budget_tier,
                details: data.details
            }
        ]);

    if (error) {
        console.error("Supabase Submission Error:", error);
        // Generic client-facing message to avoid leaking DB details
        throw new Error("Submission failed. Please try again later.");
    }

    return { success: true };
}
