import { UserModel } from "@/models/user-model";
import { Loading } from "./loading";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

interface Props {
	isLoading: boolean;
	error: Error | null;
	action: (user: UserModel) => void;
	users: UserModel[];
}
export default function CardList({ users, isLoading, error, action }: Props) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full max-w-[1000px] mt-6">
			{isLoading ? (
				<Loading />
			) : users.length ? (
				users.map((user) => (
					<Card
						key={user.id}
						className="aspect-square cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 bg-primary"
						onClick={() => action(user)}
					>
						<CardContent className="flex flex-col items-center justify-center h-full text-center gap-4 p-6">
							<Avatar className="w-20 h-20 border-2 border-white/20">
								<AvatarImage
									src={user.image}
									alt={user.name}
									className="object-cover"
								/>
								<AvatarFallback className="text-lg font-semibold">
									{user.name.slice(0, 2)}
								</AvatarFallback>
							</Avatar>

							<span className="text-sm font-medium text-white dark:text-gray-200 text-center break-words max-w-full">
								{user.name}
							</span>
						</CardContent>
					</Card>
				))
			) : (
				<Alert className="max-w-md">
					<CheckCircle2Icon />
					<AlertTitle>No se encontraron usuarios</AlertTitle>
					<AlertDescription>
						No hay usuarios que coincidan con los criterios de búsqueda.
					</AlertDescription>
				</Alert>
			)}

			{error && (
				<Alert variant="destructive" className="max-w-md">
					<AlertCircleIcon />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Ha ocurrido un error al cargar los usuarios. Por favor, inténtalo de
						nuevo más tarde.
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
}
