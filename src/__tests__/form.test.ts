import { formSchema } from '../components/IntakeForm';

describe('Intake Form Validation', () => {
    it('validates a correct form object', () => {
        const validData = {
            name: 'Maddie Thompson',
            email: 'maddie@example.com',
            brandName: 'UGC Agency',
            budget: '$3000-$5000',
            projectType: 'Paid Ads',
            message: 'Looking for scaling help.'
        };
        const result = formSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('fails if name is too short', () => {
        const invalidData = {
            name: 'M',
            email: 'm@example.com',
            brandName: 'UGC',
            budget: '$1500-$3000',
            projectType: 'TikTok Shop'
        };
        const result = formSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});
