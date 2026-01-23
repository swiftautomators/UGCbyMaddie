import * as z from 'zod';

export const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    brandName: z.string().min(2, "Brand/Website name is required"),
    budget: z.enum(['$1500-$3000', '$3000-$5000', '>$5000'], {
        errorMap: () => ({ message: "Please select a budget tier" }),
    }),
    projectType: z.enum(['TikTok Shop', 'Paid Ads', 'Organic Growth'], {
        errorMap: () => ({ message: "Please select a project type" }),
    }),
    message: z.string().optional(),
});
