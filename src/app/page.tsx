// src/app/page.tsx

export const dynamic = 'force-dynamic'; // Asegura que la página siempre sea dinámica

// Definimos un tipo para nuestros datos para que TypeScript nos ayude
interface Track {
  name: string;
  artist: {
    name: string;
  };
  url: string; // La URL original de Last.fm, la usaremos como 'key' única
}

// Esta función llama DIRECTAMENTE a la API de Last.fm
async function getTracks() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = 'LyVenegas'; // Tu usuario de Last.fm

  if (!apiKey) {
    console.error('La variable de entorno LASTFM_API_KEY no está configurada.');
    return [];
  }

  const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=${user}&api_key=${apiKey}&format=json&limit=5`;

  try {
    const response = await fetch(lastfmUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`La respuesta de Last.fm no fue exitosa. Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Error de la API de Last.fm: ${data.message}`);
    }

    return data?.lovedtracks?.track || [];
  } catch (error) {
    console.error("Error al obtener los tracks en la página:", error);
    return [];
  }
}

// Nuestra página es un componente asíncrono que obtiene los datos
export default async function HomePage() {
  const tracks: Track[] = await getTracks();

  return (
    <main className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-400">Brinf Music Journal</h1>
        <p className="text-gray-400 mt-2">Mis últimas 5 canciones favoritas en Last.fm</p>
      </header>
      
      {tracks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            // Codificamos los nombres para que sean seguros en una URL
            const artist = encodeURIComponent(track.artist.name);
            const trackName = encodeURIComponent(track.name);
            
            return (
              // El 'href' apunta a nuestra página de journal con los datos de la canción
              <a 
                key={track.url}
                href={`/journal/generate-post?artist=${artist}&track=${trackName}`}
                className="block bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-green-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-green-300 truncate" title={track.name}>
                    {track.name}
                  </h2>
                  <p className="text-gray-400 text-lg mt-1">{track.artist.name}</p>
                  <p className="text-green-500 mt-4 inline-block">
                    Generar entrada →
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl text-red-500">No se pudieron cargar las canciones.</p>
          <p className="text-gray-500 mt-2">Inténtalo de nuevo más tarde.</p>
        </div>
      )}
    </main>
  );
}