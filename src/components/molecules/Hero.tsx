import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BookImage, BookUp2, LibraryBig } from "lucide-react";

function Hero() {
  return (
    <>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl text-primary mb-4 font-[var(--font-geist-sans)]">
          Biblioteca Fredonia
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto mb-6">
          Bienvenido a la Biblioteca Fredonia, tu espacio para descubrir,
          aprender y explorar un mundo de conocimiento.
        </p>
      </div>

      {/* Sección de beneficios */}
      <section className="relative z-10 grid gap-8 md:grid-cols-3 w-full max-w-5xl px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 text-center border border-primary">
          <figure className="flex justify-center text-muted-foreground">
            <LibraryBig className="h-8 w-8" />
          </figure>
          <h3 className="text-2xl font-semibold text-primary mb-2">
            Acceso Rápido
          </h3>
          <p className="text-muted-foreground flex flex-col gap-4">
            <span>Encuentra y solicita libros en minutos.</span>
            <Link href="/books">
              <Button variant="link">Ir al catálogo</Button>
            </Link>
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 text-center border border-primary">
          <figure className="flex justify-center text-muted-foreground">
            <BookImage className="h-8 w-8" />
          </figure>
          <h3 className="text-2xl font-semibold text-primary mb-2">
            Variedad de Contenidos
          </h3>
          <p className="text-muted-foreground">
            Explora una amplia colección de libros, revistas, y referencias.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 text-center border border-primary">
          <figure className="flex justify-center text-muted-foreground">
            <BookUp2 className="h-8 w-8" />
          </figure>
          <h3 className="text-2xl font-semibold text-primary mb-2">
            Fácil Gestión
          </h3>
          <p className="text-muted-foreground">
            <span>
              Gestiona tus préstamos y devoluciones de manera sencilla.
            </span>
            <Link href="/borrow">
              <Button variant="link">Revisa tus préstamos</Button>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Hero;
