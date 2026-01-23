import { parseAIResponse } from '../lib/utils';

describe('AI Parsing Logic', () => {
    it('should parse clean JSON', () => {
        const response = '{"hook": "test hook", "angle": "test angle", "why": "test why"}';
        const result = parseAIResponse(response);
        expect(result.hook).toBe('test hook');
    });

    it('should parse JSON wrapped in code blocks', () => {
        const response = '```json\n{"hook": "test hook", "angle": "test angle", "why": "test why"}\n```';
        const result = parseAIResponse(response);
        expect(result.hook).toBe('test hook');
    });

    it('should parse JSON wrapped in simple code blocks', () => {
        const response = '```\n{"hook": "test hook", "angle": "test angle", "why": "test why"}\n```';
        const result = parseAIResponse(response);
        expect(result.hook).toBe('test hook');
    });

    it('should throw error on invalid JSON', () => {
        const response = 'invalid json';
        expect(() => parseAIResponse(response)).toThrow("Failed to parse AI response as JSON");
    });
});
