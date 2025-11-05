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

### 2. Instalar dependencias
Este proyecto usa npm como gestor de paquetes.
```bash
    npm install
```

### 3. Configurar variables de entorno

Crea un archivo llamado **.env.local** en la raíz del proyecto.
```bash
    # .env.local

# Clave obtenida en Google AI Studio (https://aistudio.google.com/app/apikey)
GOOGLE_API_KEY="TU_GOOGLE_API_KEY_AQUÍ"

# Clave obtenida en Last.fm (https://www.last.fm/api/account/create)
LASTFM_API_KEY="TU_LASTFM_API_KEY_AQUÍ"

```
### 4. Ejecutar el servidor de desarrollo
```bash
    npm run dev
```
### 5. Abrir la aplicación

En tu navegador ve a 👉 **http://localhost:3000**

---

## 🔌 Endpoints de la API

The project currently exposes the following API endpoints to be consumed by the frontend:

### POST /api/generate
Genera contenido creativo usando la API de Gemini. 

**Body (JSON):**

    {
         "prompt": "Un prompt detallado para el modelo de IA."
    }

### GET /api/lastfm
Obtiene las “canciones favoritas” del usuario desde Last.fm.

**Query Params:**
- `user` (obligatorio): El nombre de usuario de Last.fm.

**Example:**  

    /api/lastfm?user=tu_usuario

---
##  🗺️ Hoja de Ruta Futura

- [x] Construir la interfaz de usuario con React para visualizar canciones y posts.
- [ ] Añadir una base de datos (ej. Vercel Postgres con Prisma) para guardar las entradas generadas.
- [ ] Implementar paginación para navegar por toda la lista de Loved Tracks.
- [ ] Integrar generación de imágenes con IA para acompañar cada publicación.
- [ ] Añadir botones para compartir en redes sociales las “postales sonoras”.
- [ ] Refinar el prompt de IA para obtener resultados aún más creativos y variados.
