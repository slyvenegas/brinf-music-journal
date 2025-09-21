// src/app/journal/[slug]/page.tsx
'use client'; // <-- Esto es MUY importante. Indica que es un componente interactivo.

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Los parámetros de la URL llegan como 'props' a la página
export default function JournalEntryPage({ params }: { params: { slug: string } }) {
  // Usamos decodeURIComponent para limpiar el título de la canción que viene de la URL
  const songTitle = decodeURIComponent(params.slug);
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedText('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: `Escribe una entrada de blog corta y poética inspirada en el título de una canción: "${songTitle}"` }),
      });

      if (!response.ok) {
        throw new Error('La respuesta de la API no fue exitosa');
      }

      const data = await response.json();
      setGeneratedText(data.text);

    } catch (error) {
      console.error('Error al generar el texto:', error);
      setGeneratedText('Hubo un error al generar el texto. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold tracking-tight mb-4">{songTitle}</h1>

      <Button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generando...' : '✨ Generar Entrada del Diario'}
      </Button>

      {generatedText && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Entrada Generada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{generatedText}</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}