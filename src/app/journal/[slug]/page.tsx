// src/app/journal/[slug]/page.tsx
'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function JournalPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const artist = decodeURIComponent(searchParams.get('artist') || 'Artista desconocido');
  const track = decodeURIComponent(params.slug as string || 'Canción desconocida');
  const trackUrl = searchParams.get('trackUrl');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');
  const [isPostGenerated, setIsPostGenerated] = useState(false);

  const handleGeneratePost = async () => {
    setIsLoading(true);
    setGeneratedPost('');

    // --- TU PROMPT DEFINITIVO ---
    const prompt = `
      Actúa como un ensayista musical profesional y analítico, con un estilo de escritura agudo, contemporáneo y profundamente introspectivo.
      Tu objetivo es escribir una reflexión breve (exactamente 3 párrafos, sin título) que conecte la canción "${track}" del artista "${artist}" con un concepto inesperado y enigmático.

      **REGLAS ESTRICTAS (Inquebrantables):**
      - **NO uses preámbulos, saludos o introducciones.** Empieza directamente con el primer párrafo del ensayo. Tu respuesta debe ser solo el ensayo y nada más.
      - **EVITA A TODA COSTA** las siguientes frases o estructuras: "Así suena...", "No es solo una canción, es...", "Es un himno a...". Busca conexiones más sutiles, metafóricas y originales.
      - **NO escribas una reseña musical.** No hables de instrumentación, melodía o producción. Enfócate en la idea y la emoción.

      **ENFOQUE CREATIVO:**
      Para esta entrada específica, quiero que explores la canción desde una perspectiva lyncheana (David Lynch): hipnótica, onírica, surreal, meditativa y espiritual. Imagina que la canción se convierte en un paisaje en blanco y negro, con movimientos sutiles, sombras inestables y símbolos que nunca terminan de fijarse. 
      Tu escritura debe transmitir sensación de transformación continua, de algo que respira y cambia, sin jamás caer en lo siniestro, sino en lo enigmático y reflexivo.

      Escribe tu ensayo sobre "${track}".
    `;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) { throw new Error('La respuesta de la API no fue exitosa.'); }
      const data = await response.json();
      setGeneratedPost(data.text);
      setIsPostGenerated(true);
    } catch (error) {
      console.error("Error al generar el post:", error);
      setGeneratedPost('Hubo un error al intentar generar el post. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-block">
        &larr; Volver a la lista
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 sticky top-24">
          <header>
            <h1 className="text-4xl font-bold tracking-tight">{track}</h1>
            <h2 className="text-2xl text-muted-foreground mt-1">{artist}</h2>
          </header>
          <Card>
            <CardHeader><CardTitle>Inspiración</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Usa la información de esta canción para crear una nueva entrada en tu journal musical.
              </p>
              <Button 
                onClick={handleGeneratePost} 
                disabled={isLoading || isPostGenerated}
                size="lg" 
                className="w-full"
              >
                {isPostGenerated ? (
                  <><Check className="mr-2 h-4 w-4" /> Post Generado</>
                ) : isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generando...</>
                ) : (
                  '✨ Generar Post con IA'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="min-h-[300px]">
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader><Skeleton className="h-6 w-1/2 rounded-md" /></CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full rounded-md" /><Skeleton className="h-4 w-full rounded-md" /><Skeleton className="h-4 w-3/4 rounded-md" />
                </CardContent>
              </Card>
            </motion.div>
          )}
          {generatedPost && !isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader><CardTitle>Entrada Generada</CardTitle></CardHeader>
                <CardContent>
                  <article className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap">{generatedPost}</p>
                  </article>
                </CardContent>
                {trackUrl && (
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <a href={trackUrl} target="_blank" rel="noopener noreferrer">
                        Escuchar en Last.fm
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}