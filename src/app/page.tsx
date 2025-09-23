// src/app/page.tsx
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// --- FUNCIONES PARA OBTENER DATOS (SIN CAMBIOS) ---
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

// --- 1. SIMPLIFICAMOS EL TIPO 'Track' ---
// Ya no necesitamos la propiedad 'image'
type Track = {
  name: string;
  artist: {
    name: string;
  };
};

// Dejamos la función que obtiene los datos tal como estaba funcionando
async function getLovedTracks() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/lastfm?user=LyVenegas`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Fallo al obtener los datos');
  }
  const data = await res.json();
  // El truco para evitar el error si la API cambia es devolver un array vacío si no encuentra los datos
  return data?.lovedtracks?.track as Track[] || []; 
}


// --- 2. COMPONENTE DE PÁGINA SIMPLIFICADO ---
export default async function HomePage() {
  const tracks = await getLovedTracks();

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Music Journal</h1>
        <p className="text-lg text-muted-foreground">
          Una selección de mis canciones favoritas de Last.fm.
        </p>
      </header>
      
      {/* Usamos una sola columna para un look más de lista */}
      <div className="space-y-4">
        {tracks.map((track, index) => {
          const fullTitle = `${track.artist.name} - ${track.name}`;

          return (
            // --- 3. ELIMINAMOS TODA LA LÓGICA DE IMÁGENES ---
            <Link href={`/journal/${encodeURIComponent(track.name)}?artist=${encodeURIComponent(track.artist.name)}`} key={index}>
              <Card className="hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle>{fullTitle}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </main>
  );
}