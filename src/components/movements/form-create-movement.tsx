import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { movementCreateSchema } from "@/schemas/movement-create-schema";

interface Props {
	userId: string;
}
export function FormCreateMovement({ userId }: Props) {
	const form = useForm<z.infer<typeof movementCreateSchema>>({
		resolver: zodResolver(movementCreateSchema),
		defaultValues: { amount: "", date: undefined, concept: "" },
		mode: "all",
		criteriaMode: "all",
	});

	const onSubmit = (values: z.infer<typeof movementCreateSchema>) => {
		console.log(userId);
		console.log(values);
	};

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full grid grid-cols-2 gap-x-4"
				>
					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormLabel>Monto</FormLabel>
								<FormControl>
									<Input
										placeholder="2500000"
										value={field.value ?? ""}
										onChange={(e) => field.onChange(e.target.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem className="flex flex-col justify-center col-span-1">
								<FormLabel>Fecha</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													format(field.value, "PPP", { locale: es })
												) : (
													<span>Seleccione una fecha</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="concept"
						render={({ field }) => (
							<FormItem className="flex flex-col justify-center col-span-1">
								<FormLabel>Concepto</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Seleccione el concepto" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="1">Ingreso</SelectItem>
										<SelectItem value="2">Egreso</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="col-span-2 flex justify-center">
						<Button type="submit">Guardar</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
