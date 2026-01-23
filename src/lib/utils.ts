export function parseAIResponse(text: string) {
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        throw new Error("Failed to parse AI response as JSON");
    }
}
