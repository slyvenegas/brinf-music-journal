// src/app/api/lastfm/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Obtenemos los parámetros de la URL, por ejemplo: /api/lastfm?user=tu_usuario
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user');
  const apiKey = process.env.LASTFM_API_KEY;

  if (!user) {
    return NextResponse.json({ error: 'El usuario es requerido' }, { status: 400 });
  }

  const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=${user}&api_key=${apiKey}&format=json&limit=5`;

  console.log("URL construida para Last.fm:", lastfmUrl);

  try {
    const response = await fetch(lastfmUrl);
    if (!response.ok) {
      // Si la respuesta de Last.fm no es exitosa
      throw new Error(`Error de la API de Last.fm: ${response.statusText}`);
    }
    const data = await response.json();

    // Devolvemos los datos obtenidos de Last.fm
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error al contactar la API de Last.fm:", error);
    return NextResponse.json(
      { error: 'Error al obtener los datos de Last.fm' },
      { status: 500 }
    );
  }
}