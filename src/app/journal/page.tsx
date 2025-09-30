

export default function JournalListPage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            Mi Diario Musical
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Aquí aparecerán todas las entradas que hayas guardado.
        </p>
      </header>
      
      {/* Dejamos un marcador de posición para el futuro */}
      <div className="text-center text-muted-foreground">
        <p>(Próximamente: listado de entradas guardadas en la base de datos)</p>
      </div>
    </main>
  );
}