import localFont from "next/font/local";
import BooksReferences from "@/components/organisms/borrow";
import { Button } from "@/components/ui/button"; // Usa tu componente de botón personalizado si tienes uno

const geistSans = localFont({
  src: "../lib/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../lib/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen flex flex-col items-center justify-center p-8 gap-8 sm:p-16`}
    >
      <div className="relative z-10 text-center">
        <h1 className="text-6xl text-primary mb-4 font-[var(--font-geist-sans)]">
          Biblioteca Fredonia
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
          Bienvenido a la Biblioteca Fredonia, tu espacio para descubrir,
          aprender y explorar un mundo de conocimiento.
        </p>
        <Button size="lg" className="px-8 py-4 mb-8">
          Explora Nuestra Colección
        </Button>
      </div>

      {/* Sección de beneficios */}
      <section className="relative z-10 grid gap-8 md:grid-cols-3 w-full max-w-5xl px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-primary">
          <h3 className="text-2xl font-semibold text-primary mb-2">
            Acceso Rápido
          </h3>
          <p className="text-muted-foreground">
            Encuentra y solicita libros en minutos.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-primary">
          <h3 className="text-2xl font-semibold text-primary mb-2">
            Variedad de Contenidos
          </h3>
          <p className="text-muted-foreground">
            Explora una amplia colección de libros, revistas, y referencias.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-primary">
          <h3 className="text-2xl font-semibold text-primary mb-2">
            Fácil Gestión
          </h3>
          <p className="text-muted-foreground">
            Gestiona tus préstamos y devoluciones de manera sencilla.
          </p>
        </div>
      </section>

      {/* Componente de referencias */}
      <div className="relative z-10 mt-20 w-full max-w-5xl">
        <BooksReferences />
      </div>
    </div>
  );
}
