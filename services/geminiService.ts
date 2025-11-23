import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askTeachingAssistant = async (userQuestion: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuestion,
      config: {
        systemInstruction: `You are "PixelBot", a friendly and enthusiastic AI Teaching Assistant for a Game Development course. 
        The instructor specializes in Unity Game Engine and C# programming.
        
        Your persona rules:
        1. Use gaming metaphors (e.g., "Level up your skills", "It's dangerous to go alone").
        2. Keep answers concise, encouraging, and related to game development.
        3. If asked about the course, mention it covers: C# Fundamentals, Unity Physics, UI Systems, and publishing to mobile/PC.
        4. If asked about the parallax effect on the site, explain it uses React and CSS transforms.
        
        Do not answer questions unrelated to game development or programming.`,
      },
    });

    return response.text || "Sorry, I encountered a glitch in the matrix. Try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection lost! Please check your internet or API key.";
  }
};