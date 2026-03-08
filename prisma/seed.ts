import prisma from "../src/lib/prisma";
import { Prisma } from "./generated/prisma/client";

async function mainRole() {
	const countRole = await prisma.role.count();
	if (countRole > 0) {
		console.log("Roles ya existentes, saltando seed.");
		return;
	}

	const sample: Prisma.RoleCreateInput[] = [
		{
			name: "Usuario",
		},
		{
			name: "Administrador",
		},
	];

	await prisma.role.createMany({ data: sample });

	console.log("Seed completado: roles insertados.");
}

// async function mainUser() {
// 	const count = await prisma.user.count();
// 	if (count > 0) {
// 		console.log("Usuarios ya existentes, saltando seed.");
// 		return;
// 	}

// 	const sample: Prisma.UserUncheckedCreateInput[] = [
// 		{
// 			name: "Juan Pérez",
// 			email: "juan@example.com",
// 			telephone: "3001234567",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 1,
// 		},
// 		{
// 			name: "María Gómez",
// 			email: "maria@example.com",
// 			telephone: "3019876543",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 		{
// 			name: "Carlos Rodríguez",
// 			email: "carlos@example.com",
// 			telephone: "3024567890",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 		{
// 			name: "Ana Torres",
// 			email: "ana@example.com",
// 			telephone: null,
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 		{
// 			name: "Luis Fernández",
// 			email: "luis@example.com",
// 			telephone: "3041239876",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 1,
// 		},
// 		{
// 			name: "Sofía Martínez",
// 			email: "sofia@example.com",
// 			telephone: null,
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 		{
// 			name: "Pedro Ramírez",
// 			email: "pedro@example.com",
// 			telephone: "3005557788",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 		{
// 			name: "Lucía Herrera",
// 			email: "lucia@example.com",
// 			telephone: "3114443322",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 1,
// 		},
// 		{
// 			name: "Diego Castro",
// 			email: "diego@example.com",
// 			telephone: null,
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 		{
// 			name: "Marta López",
// 			email: "marta@example.com",
// 			telephone: "3159876541",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 1,
// 		},
// 		{
// 			name: "Andrés Silva",
// 			email: "andres@example.com",
// 			telephone: "3201234567",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 		{
// 			name: "Valentina Rojas",
// 			email: "valentina@example.com",
// 			telephone: null,
// 			image: "https://github.com/shadcn.png",
// 			roleId: 1,
// 		},
// 		{
// 			name: "Sebastián Molina",
// 			email: "sebastian@example.com",
// 			telephone: "3109876543",
// 			image: "https://github.com/shadcn.png",
// 			roleId: 2,
// 		},
// 	];

// 	await prisma.user.createMany({ data: sample });

// 	console.log("Seed completado: usuarios insertados.");
// }

async function mainTypeMovement() {
	const countTypeMovement = await prisma.typeMovement.count();
	if (countTypeMovement > 0) {
		console.log("Tipos de movimiento ya existentes, saltando seed.");
		return;
	}

	const sample: Prisma.typeMovementCreateInput[] = [
		{
			name: "Ingreso",
		},
		{
			name: "Egreso",
		},
	];

	await prisma.typeMovement.createMany({ data: sample });

	console.log("Seed completado: tipos de movimientos insertados.");
}

// async function mainMovement() {
// 	const count = await prisma.movement.count();
// 	if (count > 0) {
// 		console.log("Movimientos ya existentes, saltando seed.");
// 		return;
// 	}

// 	const idIngreso = await prisma.typeMovement.findUnique({
// 		where: { name: "Ingreso" },
// 		select: { id: true },
// 	});

// 	const idEgreso = await prisma.typeMovement.findUnique({
// 		where: { name: "Egreso" },
// 		select: { id: true },
// 	});

// 	const usuario = await prisma.user.findFirst({
// 		select: {
// 			id: true,
// 		},
// 	});

// 	if (!idIngreso || !idEgreso || !usuario) {
// 		console.log(
// 			"No se encontraron tipos de movimiento o usuario, saltando seed de movimientos.",
// 		);
// 		return;
// 	}

// 	const sample: Prisma.MovementUncheckedCreateInput[] = [
// 		{
// 			fecha: new Date(),
// 			monto: 545000,
// 			typeId: idIngreso.id,
// 			userId: usuario.id,
// 		},
// 		{
// 			fecha: new Date(),
// 			monto: 600000,
// 			typeId: idEgreso.id,
// 			userId: usuario.id,
// 		},
// 		{
// 			fecha: new Date(),
// 			monto: 280000,
// 			typeId: idEgreso.id,
// 			userId: usuario.id,
// 		},
// 	];

// 	await prisma.movement.createMany({ data: sample });
// 	console.log("Seed completado: movimientos insertados.");
// }

export const main = async () => {
	await mainRole();
	// await mainUser();
	await mainTypeMovement();
	// await mainMovement();
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
