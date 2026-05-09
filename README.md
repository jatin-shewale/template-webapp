# 🧬 SoundDNA: Your Musical Identity, Sequenced

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-DB_%26_Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

SoundDNA is a premium, high-fidelity platform that analyzes your Spotify listening habits to reveal your unique "Musical Personality." Using advanced data processing and custom visualization, we bridge the gap between raw data and personal identity.

![SoundDNA Banner](https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200)

## 🌟 Core Features

### 🧠 Personality Analysis Engine
Our custom algorithm processes over 50 data points from your top tracks and artists to assign you one of **8+ unique Listening Archetypes** (The Melomaniac, The Rager, The Dreamer, etc.).

### 📊 Genre DNA Visualization
High-fidelity interactive charts that breakdown your musical taste into a "genetic sequence" of genres, providing a deep dive into your auditory preferences.

### ⚡ Mood Spectrum
Understand the "vital signs" of your music: Energy, Danceability, Positivity, and more. See how your choices reflect your emotional state.

### 🎨 Shareable Identity Cards
Generate beautiful, high-resolution social media cards with a single click. Download your "Sonic Manifestation" and share your identity with the world.

### 💎 Premium Experience
- **Glassmorphism UI**: A sleek, modern aesthetic with depth and translucency.
- **Fluid Animations**: Powered by Framer Motion for a smooth, app-like feel.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v20.0.0 or higher)
- **pnpm** (v9.0.0 or higher)
- **Docker** (Required for local Supabase development)

### 1. Installation
```bash
git clone https://github.com/your-username/sounddna.git
cd sounddna
pnpm install
```

### 2. Infrastructure Setup
SoundDNA uses Supabase for local development. Ensure Docker is running, then:
```bash
supabase start
```
This will initialize your local database, authentication, and storage.

### 3. Environment Configuration
Create a `.env` file in the root directory (you can copy `.env.example`).
```bash
# Supabase (Get these from 'supabase start' output)
NEXT_PUBLIC_SUPABASE_URL=your_local_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_local_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Spotify API (Add your credentials here)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/spotify/callback
```

### 4. Database Initialization
```bash
supabase db reset
```

### 5. Launch
```bash
pnpm dev
# OR for secure local development (required if using HTTPS Redirect URIs)
pnpm dev:https
```
Navigate to `http://localhost:3000` (or `https://localhost:3000`) to begin your musical sequencing.

---

## 🛠️ Architecture & Technology

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) with OKLCH color spaces.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions.
- **Data Viz**: [Recharts](https://recharts.org/) for responsive, accessible charts.
- **Capturing**: [html2canvas](https://html2canvas.hertzen.com/) for high-res identity card exports.
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Edge Functions).

---

## 📈 What I'd Improve with More Time

1. **Real-time Collaboration**: Allow users to compare their SoundDNA with friends in real-time.
2. **AI-Powered Playlists**: Generate personalized Spotify playlists based on your Archetype.
3. **Advanced Temporal Analysis**: Show how your Musical Identity has evolved over years, not just months.
4. **Stripe Integration**: Fully functional Pro tier with exclusive visualization modules.

---

## 🆘 Troubleshooting

### `redirect_uri: Insecure` Error
This usually occurs when there is a protocol mismatch between your environment and the Spotify Dashboard.
1. Ensure `SPOTIFY_REDIRECT_URI` in `.env` uses `http://127.0.0.1:3000/...` instead of `https`.
2. Verify that the **exact same** URL is added to the "Redirect URIs" section in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
3. Using `127.0.0.1` is often more stable than `localhost` for local development.

### Analysis Fails
- Ensure you have correctly added your Spotify User Email as a **Redirect User** in the Spotify Dashboard (required while your app is in "Development Mode").
- Check that your `SPOTIFY_CLIENT_SECRET` is correct.

---

## 🛡️ License
Built for the 8x Hiring Assignment. Licensed under the MIT License.

Built with ❤️ for the future of music analysis.
