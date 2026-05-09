export type ListeningArchetype = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  color: string;
  audioFeatures: {
    energy: number;
    danceability: number;
    acousticness: number;
    valence: number;
    tempo: number;
  };
};

export const ARCHETYPES: ListeningArchetype[] = [
  {
    id: "the-melomaniac",
    name: "The Melomaniac",
    emoji: "🎵",
    description:
      "You live and breathe music. Your taste is eclectic, sophisticated, and always ahead of the curve.",
    traits: ["Curious", "Diverse", "Knowledgeable", "Exploratory"],
    color: "from-purple-500 to-pink-500",
    audioFeatures: {
      energy: 0.7,
      danceability: 0.6,
      acousticness: 0.4,
      valence: 0.6,
      tempo: 120,
    },
  },
  {
    id: "the-rager",
    name: "The Rager",
    emoji: "🔥",
    description:
      "High energy, high intensity. You need beats that match your fire.",
    traits: ["Energetic", "Bold", "Intense", "Unstoppable"],
    color: "from-red-500 to-orange-500",
    audioFeatures: {
      energy: 0.95,
      danceability: 0.85,
      acousticness: 0.1,
      valence: 0.7,
      tempo: 128,
    },
  },
  {
    id: "the-dreamer",
    name: "The Dreamer",
    emoji: "☁️",
    description:
      "Lost in melodies and atmosphere. Your music takes you to another world.",
    traits: ["Imaginative", "Introspective", "Atmospheric", "Ethereal"],
    color: "from-blue-500 to-indigo-500",
    audioFeatures: {
      energy: 0.4,
      danceability: 0.4,
      acousticness: 0.5,
      valence: 0.5,
      tempo: 90,
    },
  },
  {
    id: "the-nostalgic",
    name: "The Nostalgic",
    emoji: "📼",
    description:
      "You find magic in the golden days. Your playlists are time machines.",
    traits: ["Sentimental", "Timeless", "Warm", "Reflective"],
    color: "from-amber-500 to-yellow-500",
    audioFeatures: {
      energy: 0.5,
      danceability: 0.5,
      acousticness: 0.6,
      valence: 0.6,
      tempo: 100,
    },
  },
  {
    id: "the-chameleon",
    name: "The Chameleon",
    emoji: "🦎",
    description:
      "Your taste shifts with the seasons, moods, and discoveries. Never predictable.",
    traits: ["Adaptable", "Versatile", "Curious", "Fluid"],
    color: "from-emerald-500 to-teal-500",
    audioFeatures: {
      energy: 0.6,
      danceability: 0.6,
      acousticness: 0.5,
      valence: 0.6,
      tempo: 110,
    },
  },
  {
    id: "the-cerebral",
    name: "The Cerebral",
    emoji: "🧠",
    description:
      "Complexity excites you. Odd time signatures and intricate layers are your playground.",
    traits: ["Analytical", "Sophisticated", "Detail-oriented", "Progressive"],
    color: "from-slate-600 to-gray-600",
    audioFeatures: {
      energy: 0.6,
      danceability: 0.3,
      acousticness: 0.4,
      valence: 0.4,
      tempo: 140,
    },
  },
  {
    id: "the-soulful",
    name: "The Soulful",
    emoji: "💜",
    description:
      "Feeling matters most. Your music comes from the heart and speaks to the soul.",
    traits: ["Emotional", "Authentic", "Passionate", "Deep"],
    color: "from-rose-500 to-red-400",
    audioFeatures: {
      energy: 0.5,
      danceability: 0.5,
      acousticness: 0.6,
      valence: 0.7,
      tempo: 85,
    },
  },
  {
    id: "the-hipster",
    name: "The Hipster",
    emoji: "🎧",
    description:
      "You were into it before it was cool. Indie gems and undiscovered artists fill your library.",
    traits: ["Alternative", "Underground", "Discerning", "Unique"],
    color: "from-green-500 to-lime-500",
    audioFeatures: {
      energy: 0.5,
      danceability: 0.4,
      acousticness: 0.7,
      valence: 0.5,
      tempo: 105,
    },
  },
];

export type GenreDNA = {
  genre: string;
  percentage: number;
  color: string;
};

export type MoodSpectrum = {
  energy: number;
  danceability: number;
  acousticness: number;
  valence: number;
  instrumentalness: number;
  speechiness: number;
};

export type AlterEgo = {
  name: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
};

export function getAlterEgo(archetype: ListeningArchetype): AlterEgo {
  const alterEgos = {
    "the-melomaniac": {
      name: "The Curator",
      title: "Musical Archivist",
      emoji: "📚",
      color: "from-purple-400 to-pink-400",
    },
    "the-rager": {
      name: "The Firestarter",
      title: "Energy Incarnate",
      emoji: "⚡",
      color: "from-red-400 to-orange-400",
    },
    "the-dreamer": {
      name: "The Voyager",
      title: "Stellar Wanderer",
      emoji: "🚀",
      color: "from-blue-400 to-indigo-400",
    },
    "the-nostalgic": {
      name: "The Timekeeper",
      title: "Memory Guardian",
      emoji: "⏰",
      color: "from-amber-400 to-yellow-400",
    },
    "the-chameleon": {
      name: "The Shape-shifter",
      title: "Eternal Explorer",
      emoji: "🌀",
      color: "from-emerald-400 to-teal-400",
    },
    "the-cerebral": {
      name: "The Oracle",
      title: "Pattern Seeker",
      emoji: "🔮",
      color: "from-slate-400 to-gray-400",
    },
    "the-soulful": {
      name: "The Empath",
      title: "Feeling Conduit",
      emoji: "💫",
      color: "from-rose-400 to-red-300",
    },
    "the-hipster": {
      name: "The Explorer",
      title: "Undiscovered Finder",
      emoji: "🗺️",
      color: "from-green-400 to-lime-400",
    },
  };
  return {
    ...alterEgos[archetype.id as keyof typeof alterEgos],
    description: archetype.description,
  };
}
