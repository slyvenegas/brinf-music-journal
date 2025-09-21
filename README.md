# 🎼 Brinf Music Journal

A personal blog generator that transforms your Last.fm listening history into unique, AI-generated creative posts. This project connects to your scrobbles, selects a song, and leverages the power of the Google Gemini AI to write an evocative text inspired by the song's title.

*(A future screenshot of the project will be placed here once the UI is developed)*

---

## ✨ Key Features

- **Direct Last.fm Integration:** Fetches your real-time listening history.
- **AI-Powered Content Generation:** Uses the **Gemini 1.5 Flash** model to create poetic and creative texts based on song titles.
- **Secure Backend:** API keys are handled securely in the Next.js backend, never exposing them on the client side.
- **Personalized Blog:** The output is a blog where each entry is a "sound postcard"—an artistic interpretation of your music.
- **Scalable Foundation:** Built on a modern stack with Next.js and TypeScript, ready to grow.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Styling:** CSS Modules
- **Music API:** [Last.fm API](https://www.last.fm/api/intro)
- **Artificial Intelligence API:** [Google AI Studio (Gemini API)](https://aistudio.google.com/)
- **Deployment (Planned):** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started & Local Setup

Follow these steps to get the project running on your local machine.

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/brinf-music-journal.git
cd brinf-music-journal
```

**2. Install dependencies:**  
This project uses npm as the package manager.
```bash
npm install
```

**3. Set up environment variables:**  
Create a file named `.env.local` in the root of the project. You can do this by duplicating the `.env.example` file if one exists. This file will hold your secret API keys.

```bash
# .env.local

# Key obtained from Google AI Studio (https://aistudio.google.com/app/apikey)
GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"

# Key obtained from Last.fm (https://www.last.fm/api/account/create)
LASTFM_API_KEY="YOUR_LASTFM_API_KEY_HERE"
```

**4. Run the development server:**
```bash
npm run dev
```

**5. Open the application:**  
Go to http://localhost:3000 in your browser to see the project in action.

---

## 🔌 API Endpoints

The project currently exposes the following API endpoints to be consumed by the frontend:

### `POST /api/generate`
Generates creative text content using the Gemini API.

- **Body (JSON):**
```json
{
  "prompt": "The text to be used as inspiration."
}
```

- **Success Response (JSON):**
```json
{
  "text": "The AI-generated content..."
}
```

---

### `GET /api/lastfm`
Fetches the most recently listened-to tracks for a given Last.fm user.

- **Query Params:**
  - `user` (required): The Last.fm username.  
  Example: `/api/lastfm?user=your_username`

- **Success Response (JSON):**  
Returns the direct response from the Last.fm API containing the list of tracks.

---

## 🗺️ Future Roadmap

- [ ] Build the user interface with React to visualize tracks and posts.  
- [ ] Integrate AI-powered image generation to accompany each blog post.  
- [ ] Add a database (e.g., PostgreSQL with Prisma) to persist the generated entries.  
- [ ] Implement pagination to navigate through the entire Last.fm scrobble history.  
- [ ] Add social sharing buttons for the "sound postcards".  
