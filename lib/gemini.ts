import { PersonalityResult } from "./personality/analyzer";

export async function generateMusicalReading(result: PersonalityResult) {
  const prompt = `
    Analyze this person's musical identity and provide a deep, premium personality report.
    
    Archetype: ${result.archetype.name}
    Top Artists: ${result.topArtists.map(a => a.name).join(", ")}
    Top Track: ${result.topTracks[0]?.name} by ${result.topTracks[0]?.artists[0]}
    Mood Spectrum: Energy ${result.moodSpectrum.energy}%, Danceability ${result.moodSpectrum.danceability}%, Positivity ${result.moodSpectrum.valence}%
    
    Return EXACTLY a JSON object with this structure and no other text or markdown:
    {
      "reading": "3-4 short, punchy sentences in a premium SaaS tone.",
      "personalizedArchetype": "A more specific, creative name for their archetype (e.g., 'The Cinematic Loner').",
      "mainCharacterEnergy": "A 2-3 word description of their vibe (e.g., 'Midnight Drive Vibes').",
      "signatureReason": "A 1-sentence reason why their top track defines their soul."
    }
  `;

  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: prompt,
        stream: false,
        format: "json"
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    const cleanJson = data.response.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Ollama Error:", error);
    return {
      reading: "Your soul is a complex symphony that even AI is trying to fully grasp.",
      personalizedArchetype: result.archetype.name,
      mainCharacterEnergy: "Unique Frequency",
      signatureReason: "This track resonates with your core frequency."
    };
  }
}
