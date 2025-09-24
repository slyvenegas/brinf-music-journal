// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

// --- 1. AÑADIMOS 'url' A NUESTRO TIPO Track ---
type Track = {
  name: string;
  artist: { name: string; };
  url: string; // <-- La URL de la canción en Last.fm
};

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch('/api/lastfm?user=LyVenegas');
        if (!res.ok) { throw new Error('Fallo al obtener los datos'); }
        const data = await res.json();
        setTracks(data?.lovedtracks?.track || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTracks();
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-12">
        <h1 className="font-serif text-5xl font-bold tracking-tight">Music Journal</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Una selección de mis canciones favoritas de Last.fm.
        </p>
      </header>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tracks.map((track, index) => (
            <motion.div key={index} variants={itemVariants}>
              {/* --- 2. AÑADIMOS la URL de la canción como PARÁMETRO --- */}
              <Link href={`/journal/${encodeURIComponent(track.name)}?artist=${encodeURIComponent(track.artist.name)}&trackUrl=${encodeURIComponent(track.url)}`}>
                <Card className="hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="font-serif truncate">{`${track.name} - ${track.artist.name}`}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}