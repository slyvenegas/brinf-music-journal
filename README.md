# 🎼 Brinf Music Journal

Un generador de blogs personales que transforma tu historial de escucha de Last.fm en publicaciones creativas generadas con IA.  
Este proyecto se conecta a tus *scrobbles*, selecciona una canción y aprovecha el poder de la IA Google Gemini para escribir un texto evocador inspirado en el título de la canción.

Modo Claro:  
<img width="1920" height="1789" alt="FireShot Capture 096 - Brinf Music Journal -  brinf-music-journal vercel app" src="https://github.com/user-attachments/assets/048079cb-e42f-4ae1-8a35-7247c652e38c" />

Modo Oscuro:  
<img width="1920" height="1789" alt="FireShot Capture 097 - Brinf Music Journal -  brinf-music-journal vercel app" src="https://github.com/user-attachments/assets/f96d95c8-4567-405b-bc16-dc2ccda2ec4e" />

---

## ✨ Características Principales

- **Contenido Curado:** Obtiene tus canciones marcadas como “Loved Tracks” en Last.fm, no solo tus escuchas recientes.  
- **Generación de Contenido con IA:** Usa el modelo Gemini 1.5 Flash para crear textos poéticos y creativos basados en los títulos de canciones y artistas.  
- **UI/UX Profesional:** Interfaz moderna y visualmente atractiva construida con una librería de componentes profesional.  
- **Modo Claro/Oscuro:** Cambio de tema completamente implementado para mayor comodidad del usuario.  
- **Dinámico e Interactivo:** Animaciones fluidas, efectos hover y estados de carga para una experiencia amigable.  
- **Backend Seguro:** Las claves de API se manejan de forma segura en el backend de Next.js, sin exponerlas al cliente.  

---

## 🛠️ Tech Stack

- **Framework:** Next.js (con App Router)  
- **Lenguaje:** TypeScript  
- **Componentes UI:** Shadcn/ui  
- **Estilos:** Tailwind CSS  
- **Animaciones:** Framer Motion  
- **Temas:** next-themes  
- **Íconos:** Lucide React  
- **API de Música:** Last.fm API  
- **API de Inteligencia Artificial:** Google AI Studio (Gemini API)  
- **Despliegue:** Vercel  

---

## 🚀 Inicio Rápido & Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### 1. Clonar el repositorio

```bash
git clone https://github.com/LyVenegas/brinf-music-journal.git
cd brinf-music-journal
```

### 2. Install dependencies
```bash
This project uses npm as the package manager.
```
    npm install

### 3. Set up environment variables

Create a file named **.env.local** in the root of the project. This file will hold your secret API keys.
```bash
    # .env.local

    # Key obtained from Google AI Studio (https://aistudio.google.com/app/apikey)
    GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"

    # Key obtained from Last.fm (https://www.last.fm/api/account/create)
    LASTFM_API_KEY="YOUR_LASTFM_API_KEY_HERE"
```
### 4. Run the development server
```bash
    npm run dev
```
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
