// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Music } from "lucide-react"; // <-- Importamos el icono directamente

type Track = {
  name: string;
  artist: { name: string };
  url: string;
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

  const containerVariants = { /* ... (no cambia) */ };
  const itemVariants = { /* ... (no cambia) */ };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text">
            Music Journal
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Transforma tu historial de Last.fm en un diario poético. Selecciona una de tus canciones favoritas y deja que la IA cree una historia.
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
              <Link href={`/journal/${encodeURIComponent(track.name)}?artist=${encodeURIComponent(track.artist.name)}&trackUrl=${encodeURIComponent(track.url)}`}>
                <Card className="h-full group hover:border-primary/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-muted/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-semibold truncate">
                      {track.name}
                    </CardTitle>
                    <Music className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {track.artist.name}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
