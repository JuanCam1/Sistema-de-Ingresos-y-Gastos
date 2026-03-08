
# Prueba Tecnica - Sistema de Gestion de Ingresos y Gastos

Sistema de gestión de ingresos y gastos

## Stack
- [Next.js](https://nextjs.org/) + [React](https://es.react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/) (PostgreSQL)
- [Better Auth](https://www.better-auth.com/) (login social con GitHub + sesiones)
- [TanStack React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Biome](https://biomejs.dev/) (lint y formato)
- [Vitest](https://vitest.dev/) + Testing Library (pruebas)

## Requisitos
- [Node.js](https://nodejs.org/en/) (recomendado: `v24.13.0`, minimo `v20+`)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Variables de Entorno
Este proyecto usa `.env.local`.

Crea el archivo `.env.local` en la raiz del proyecto con al menos:

```env
DATABASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=
```

## Instalacion
1. Clona el repositorio:

```bash
git clone https://github.com/JuanCam1/Sistema-de-Ingresos-y-Gastos.git
cd Prueba-Tecnica
```

2. Instala dependencias:

```bash
npm install
```

Nota:
`npm install` ejecuta `postinstall` y corre automaticamente:
- `prisma generate`
- `tsx prisma/seed.ts`

## Ejecutar en Desarrollo

```bash
npm run dev
```

Aplicacion:
- `http://localhost:3000`

## Documentacion API (Swagger)
Con el proyecto en ejecucion, abre:

- `http://localhost:3000/api/docs`

El JSON OpenAPI se sirve en:
- `http://localhost:3000/api/swagger.json`

## Scripts Disponibles
- `npm run dev`: inicia el entorno de desarrollo
- `npm run test`: ejecuta pruebas unitarias con Vitest
- `npm run lint`: lint con Biome (modo write)
- `npm run format`: formatea codigo con Biome

## Pruebas
Ejecutar todas las pruebas:

```bash
npm run test
```

Actualmente incluye pruebas de alto valor para:
- Flujo de login en `pages/index.tsx` con Better Auth (GitHub)
- Redireccion cuando el usuario ya tiene sesion
- Flujo de creacion de movimiento en `useCreateMovement` (mutacion + invalidacion de cache + notificacion)

## Autenticacion
- Proveedor social: GitHub
- Manejo de sesion: Better Auth

## Deploy en Vercel
1. Sube el proyecto a GitHub:

```bash
git push
```

2. Entra a [Vercel](https://vercel.com/), selecciona **Add New Project** e importa tu repositorio.

3. Configura las variables de entorno en Vercel (Project Settings -> Environment Variables):

```env
DATABASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=
```

4. En `NEXT_PUBLIC_APP_URL` coloca la URL publica del deploy, por ejemplo:
- `https://tu-proyecto.vercel.app`

5. En GitHub OAuth App, agrega/actualiza la URL de callback para el dominio de Vercel.

6. Despliega el proyecto con **Deploy**.

