// app/api/generate/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Accedemos a la API Key desde las variables de entorno
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Creamos una función POST que Next.js ejecutará cuando se llame a esta ruta
export async function POST(request: Request) {
  // Obtenemos el "prompt" del cuerpo de la petición que enviaremos
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json(
      { error: "El prompt es requerido" },
      { status: 400 }
    );
  }

  try {
    // Inicializamos el modelo que queremos usar
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Enviamos el prompt al modelo
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Devolvemos la respuesta del modelo en formato JSON
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Error al contactar la API de Gemini:", error);
    // Si hay un error, lo devolvemos para poder depurarlo
    return NextResponse.json(
      { error: "Error al generar el contenido" },
      { status: 500 }
    );
  }
}