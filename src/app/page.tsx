// src/app/page.tsx
import Link from 'next/link'; // <--- 1. IMPORTAMOS EL COMPONENTE LINK
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// ... (el resto del código de getRecentTracks y Track no cambia)
type Track = {
  name: string;
  artist: {
    '#text': string;
  };
};

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

async function getRecentTracks() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/lastfm?user=LyVenegas`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Fallo al obtener los datos');
  }
  const data = await res.json();
  return data.recenttracks.track as Track[];
}

export default async function HomePage() {
  const tracks = await getRecentTracks();

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Music Journal</h1>
        <p className="text-lg text-muted-foreground">
          Un registro de mi historial de música reciente vía Last.fm.
        </p>
      </header>

      <div className="space-y-4">
        {tracks.map((track, index) => (
          // --- 2. ENVOLVEMOS LA CARD EN UN LINK ---
          <Link href={`/journal/${encodeURIComponent(track.name)}`} key={index}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>{track.artist['#text']}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}