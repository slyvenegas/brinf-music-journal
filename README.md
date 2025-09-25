# 🎼 Brinf Music Journal

A personal blog generator that transforms your Last.fm listening history into unique, AI-generated creative posts. This project connects to your scrobbles, selects a song, and leverages the power of the Google Gemini AI to write an evocative text inspired by the song's title.

Light Mode:
<img width="1920" height="1789" alt="FireShot Capture 096 - Brinf Music Journal -  brinf-music-journal vercel app" src="https://github.com/user-attachments/assets/048079cb-e42f-4ae1-8a35-7247c652e38c" />

Dark Mode:
<img width="1920" height="1789" alt="FireShot Capture 097 - Brinf Music Journal -  brinf-music-journal vercel app" src="https://github.com/user-attachments/assets/f96d95c8-4567-405b-bc16-dc2ccda2ec4e" />

---

## ✨ Key Features

- **Curated Content:** Fetches your personally curated 'Loved Tracks' from Last.fm, not just recent listens.  
- **AI-Powered Content Generation:** Uses the Gemini 1.5 Flash model to create poetic and creative texts based on song titles and artists.  
- **Professional UI/UX:** A modern and aesthetically pleasing interface built with a professional component library.  
- **Dark/Light Mode:** Fully implemented theme switching for user comfort.  
- **Dynamic & Interactive:** Smooth animations, hover effects, and loading states provide an engaging user experience.  
- **Secure Backend:** API keys are handled securely in the Next.js backend, never exposing them on the client side.  

---

## 🛠️ Tech Stack

- **Framework:** Next.js (with App Router)  
- **Language:** TypeScript  
- **UI Components:** Shadcn/ui  
- **Styling:** Tailwind CSS  
- **Animations:** Framer Motion  
- **Theming:** next-themes  
- **Icons:** Lucide React  
- **Music API:** Last.fm API  
- **Artificial Intelligence API:** Google AI Studio (Gemini API)  
- **Deployment:** Vercel  

---

## 🚀 Getting Started & Local Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the repository

    git clone https://github.com/LyVenegas/brinf-music-journal.git
    cd brinf-music-journal

### 2. Install dependencies

This project uses npm as the package manager.

    npm install

### 3. Set up environment variables

Create a file named **.env.local** in the root of the project. This file will hold your secret API keys.

    # .env.local

    # Key obtained from Google AI Studio (https://aistudio.google.com/app/apikey)
    GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"

    # Key obtained from Last.fm (https://www.last.fm/api/account/create)
    LASTFM_API_KEY="YOUR_LASTFM_API_KEY_HERE"

### 4. Run the development server

    npm run dev

### 5. Open the application

Go to **http://localhost:3000** in your browser to see the project in action.

---

## 🔌 API Endpoints

The project currently exposes the following API endpoints to be consumed by the frontend:

### POST /api/generate
Generates creative text content using the Gemini API.  

**Body (JSON):**

    {
      "prompt": "A detailed prompt for the AI model."
    }

### GET /api/lastfm
Fetches the user's "Loved Tracks" from Last.fm.  

**Query Params:**
- `user` (required): The Last.fm username.

**Example:**  

    /api/lastfm?user=your_username

---

## 🗺️ Future Roadmap

- [x] Build the user interface with React to visualize tracks and posts.  
- [ ] Add a database (e.g., Vercel Postgres with Prisma) to persist the generated entries.  
- [ ] Implement pagination to navigate through the entire list of Loved Tracks.  
- [ ] Integrate AI-powered image generation to accompany each blog post.  
- [ ] Add social sharing buttons for the "sound postcards".  
- [ ] Refine the AI prompt for even more creative and varied results.  
