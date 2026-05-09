import { GoogleGenerativeAI } from "@google/generative-ai";
import { PersonalityResult } from "./personality/analyzer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateMusicalReading(result: PersonalityResult) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      reading: "Connect your Gemini API key to unlock deep personality insights.",
      personalizedArchetype: result.archetype.name,
      mainCharacterEnergy: "Unknown Energy",
      signatureReason: "A track that defines you."
    };
  }

  const prompt = `
    Analyze this person's musical identity and provide a deep, premium personality report.
    
    Archetype: ${result.archetype.name}
    Top Artists: ${result.topArtists.map(a => a.name).join(", ")}
    Top Track: ${result.topTracks[0]?.name} by ${result.topTracks[0]?.artists[0]}
    Mood Spectrum: Energy ${result.moodSpectrum.energy}%, Danceability ${result.moodSpectrum.danceability}%, Positivity ${result.moodSpectrum.valence}%
    
    Return a JSON object with:
    1. "reading": 3-4 short, punchy sentences in a premium SaaS tone.
    2. "personalizedArchetype": A more specific, creative name for their archetype (e.g., "The Cinematic Loner", "The High-Velocity Visionary").
    3. "mainCharacterEnergy": A 2-3 word description of their vibe (e.g., "Main Character Energy", "Midnight Drive Vibes").
    4. "signatureReason": A 1-sentence reason why their top track defines their soul.

    Keep it sophisticated, slightly edgy, and highly shareable. No markdown in the JSON.
  `;

  try {
    const chatResult = await model.generateContent(prompt);
    const responseText = chatResult.response.text();
    // Clean potential markdown code blocks
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reading: "Your soul is a complex symphony that even AI is trying to fully grasp.",
      personalizedArchetype: result.archetype.name,
      mainCharacterEnergy: "Unique Frequency",
      signatureReason: "This track resonates with your core frequency."
    };
  }
}
