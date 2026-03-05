import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">

      <Card className="w-full max-w-sm p-8">
        <CardHeader className="text-center border-b border-border text-primary text-2xl font-bold">
          Sistema de Gestión de Ingresos y Gastos
        </CardHeader>

        <CardDescription>
          <form>
            <label htmlFor="email" className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
            <input
              id="email"
              type="email"
              className="mb-3 w-full rounded-md border border-border bg-card py-2 px-3 text-sm text-card-foreground focus:outline-none"
              required
            />

            <label htmlFor="password" className="mb-1 block text-xs font-medium text-muted-foreground">Contraseña</label>
            <input
              id="password"
              type="password"
              className="mb-3 w-full rounded-md border border-border bg-card py-2 px-3 text-sm text-card-foreground focus:outline-none"
              required
            />

            {/* {error && <p className="mb-2 text-sm text-red-600">{error}</p>} */}

            <Button className="cursor-pointer w-full">
              Iniciar sesión
            </Button>
          </form>
        </CardDescription>

        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:bg-foreground/70 cursor-pointer">
          <img src="/github.svg" className="size-5" />
          Iniciar sesion con GitHub
        </button>

        <CardFooter className="text-xs text-center text-gray-400">
          Al iniciar sesion se creara tu cuenta automaticamente
        </CardFooter>
      </Card>

    </div >
  );
}
