import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { userUpdateSchema } from "@/schemas/user-create-schema";
import { UserModel } from "@/models/user-model";
import { useRole } from "@/hooks/use-role";

interface Props {
	userSelected: UserModel;
}
export function FormUpdateUser({ userSelected }: Props) {
	const query = useRole();

	const roles = query.data ?? [];
	const isLoading = query.isLoading;
	const error = query.error;

	const form = useForm<z.infer<typeof userUpdateSchema>>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			name: userSelected.name,
			roleId: String(userSelected.role.id),
		},
	});

	const onSubmit = (values: z.infer<typeof userUpdateSchema>) => {
		console.log(values);
	};

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full gap-x-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="roleId"
						render={({ field }) => (
							<FormItem className="flex flex-col justify-center">
								<FormLabel>Role</FormLabel>

								{isLoading ? (
									<div className="p-2 text-center text-sm text-gray-500">
										Cargando...
									</div>
								) : error ? (
									<div className="p-2 text-center text-sm text-red-500">
										Ocurrió un error al cargar los roles
									</div>
								) : (
									<Select value={field.value} onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Seleccione el concepto" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{roles.map((role) => (
												<SelectItem key={role.id} value={String(role.id)}>
													{role.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}

								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="col-span-2 flex justify-center">
						<Button type="submit">Actualizar</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
