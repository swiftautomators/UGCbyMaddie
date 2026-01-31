import { formSchema } from '../components/IntakeForm';

describe('IntakeForm Validation', () => {
    it('should validate a correct form submission', () => {
        const validData = {
            name: 'John Doe',
            email: 'john@example.com',
            brandName: 'Test Brand',
            budget: '$3000-$5000',
            projectType: 'TikTok Shop',
            message: 'Hello'
        };
        const result = formSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
        const invalidData = {
            name: 'John Doe',
            email: 'invalid-email',
            brandName: 'Test Brand',
            budget: '$3000-$5000',
            projectType: 'TikTok Shop'
        };
        const result = formSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe('Invalid email address');
        }
    });

    it('should fail on missing fields', () => {
        const missingData = {
            name: 'J',
            email: '',
            brandName: '',
        };
        const result = formSchema.safeParse(missingData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors.length).toBeGreaterThan(1);
        }
    });

    it('should fail on invalid budget tier', () => {
        const invalidData = {
            name: 'John Doe',
            email: 'john@example.com',
            brandName: 'Test Brand',
            budget: 'invalid-tier' as any,
            projectType: 'TikTok Shop'
        };
        const result = formSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});
