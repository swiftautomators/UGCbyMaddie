import { parseAIResponse } from '../lib/utils';

describe('AI Utils', () => {
    it('cleanses and parses JSON from Gemini markdown output', () => {
        const rawResponse = '```json\n{"hook": "test", "angle": "test", "why": "test"}\n```';
        const parsed = parseAIResponse(rawResponse);
        expect(parsed.hook).toBe('test');
    });

    it('throws error on invalid JSON', () => {
        const badResponse = 'not json';
        expect(() => parseAIResponse(badResponse)).toThrow();
    });
});
