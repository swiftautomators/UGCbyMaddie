"use server";

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

    const { formSchema } = await import('@/lib/schemas');

    // Server-side validation with Zod
    const validation = formSchema.safeParse({
        name: (data.details as any).name,
        email: data.email,
        brandName: (data.details as any).brand_name,
        budget: data.budget_tier,
        projectType: data.project_type,
        message: (data.details as any).message
    });

    if (!validation.success) {
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
