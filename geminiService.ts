
import { GoogleGenAI, Type } from "@google/genai";
import { Category, Lesson, Language, TimeSlot } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Gets a pseudo-random category based on the current date and time slot 
 * to ensure variety but consistency for all users on the same day.
 */
function getRandomCategory(slot: TimeSlot): Category {
  const categories = Object.values(Category);
  const date = new Date();
  // Using day of the year + slot index to create a unique seed for rotation
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const slotIndex = slot === TimeSlot.MORNING ? 0 : slot === TimeSlot.AFTERNOON ? 5 : 10;
  
  const index = (dayOfYear + slotIndex) % categories.length;
  return categories[index];
}

export async function generateTimedLesson(slot: TimeSlot, category?: Category, language: Language = Language.SW): Promise<Lesson> {
  const isSwahili = language === Language.SW;
  const promptLanguage = isSwahili ? "Kiswahili" : "English";

  // Use the provided category OR a rotated dynamic category
  const contextCategory = category || getRandomCategory(slot);

  const slotMood = {
    [TimeSlot.MORNING]: "Energetic, goal-oriented, and motivational. Start the day with clarity.",
    [TimeSlot.AFTERNOON]: "Practical, productivity-focused, and execution-oriented. Keep the momentum going.",
    [TimeSlot.NIGHT]: "Reflective, deep, and peaceful. Lessons on wisdom, character, and legacy."
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a world-class mentor and polymath. Create a high-impact micro-lesson in ${promptLanguage}.
    
    CATEGORY: ${contextCategory}
    TIME OF DAY: ${slot}
    TONE/MOOD: ${slotMood[slot]}
    
    CRITICAL REQUIREMENTS:
    1. DO NOT give generic advice. Be specific and actionable.
    2. Mix insights from global experts (e.g., Naval Ravikant, Nassim Taleb, Marcus Aurelius, or modern African entrepreneurs).
    3. The lesson must feel fresh and unique to this specific time of day.
    4. Format: 3-5 concise, powerful paragraphs.
    5. Include a punchy 'Core Takeaway'.
    6. Ensure the 'Inspiration' field credits the specific author or philosophy used.
    ${isSwahili ? 'Tumia Kiswahili fasaha na chenye ushawishi.' : 'Use professional and engaging English.'}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.ARRAY, items: { type: Type.STRING } },
          takeaway: { type: Type.STRING },
          readTime: { type: Type.STRING },
          inspiration: { type: Type.STRING }
        },
        required: ["title", "content", "takeaway", "readTime", "inspiration"]
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date().toLocaleDateString(isSwahili ? 'sw-TZ' : 'en-US', dateOptions);

  return {
    id: `lesson-${slot}-${Date.now()}`,
    title: data.title,
    content: data.content,
    takeaway: data.takeaway,
    category: contextCategory,
    date: formattedDate,
    readTime: data.readTime,
    inspiration: data.inspiration,
    language: language,
    timeSlot: slot
  };
}
