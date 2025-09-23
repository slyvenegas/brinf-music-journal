// src/app/journal/[slug]/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react'; // Importamos useState

export default function JournalPage() {
  const searchParams = useSearchParams();
  const artist = decodeURIComponent(searchParams.get('artist') || 'Artista desconocido');
  const track = decodeURIComponent(searchParams.get('track') || 'Canción desconocida');

  // Creamos estados para manejar la carga y el post generado
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');

  const handleGeneratePost = async () => {
    setIsLoading(true); // Empezamos la carga
    setGeneratedPost(''); // Limpiamos el post anterior

    // Creamos el prompt que enviaremos a nuestra API
    const prompt = `Escribe una entrada de blog poética y reflexiva, de no más de 3 párrafos, inspirada en la canción "${track}" del artista ${artist}.`;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('La respuesta de la API de generación no fue exitosa.');
      }

      const data = await response.json();
      setGeneratedPost(data.text); // Guardamos el texto generado

    } catch (error) {
      console.error("Error al generar el post:", error);
      setGeneratedPost('Hubo un error al intentar generar el post. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false); // Terminamos la carga
    }
  };

  return (
    <main className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <header className="text-center mb-12">
        <p className="text-green-400">Generador de Entradas de Journal</p>
        <h1 className="text-4xl font-bold mt-2 truncate" title={track}>{track}</h1>
        <h2 className="text-2xl text-gray-400 mt-1">{artist}</h2>
      </header>
      
      <div className="flex flex-col items-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
          <p className="text-lg text-gray-300">
            Usa la información de esta canción como inspiración para crear una nueva entrada en tu journal musical.
          </p>
          <button 
            onClick={handleGeneratePost}
            disabled={isLoading} // Deshabilitamos el botón mientras carga
            className="mt-8 bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generando...' : 'Generar Post con IA'}
          </button>
        </div>

        {/* Sección para mostrar el post generado */}
        {generatedPost && (
          <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-2xl font-bold text-green-300 mb-4">Entrada Generada</h3>
            {/* Usamos 'whitespace-pre-wrap' para respetar los saltos de línea */}
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{generatedPost}</p>
          </div>
        )}
      </div>
    </main>
  );
}