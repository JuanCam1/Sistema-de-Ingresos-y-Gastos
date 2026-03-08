import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons/github-icon";

export default function LoginPage() {
	const router = useRouter();

	const handleLogin = () => {
		router.push("/home");
	};

	return (
		<div className="flex min-h-screen items-center justify-center ">
			<Card className="w-full max-w-md p-8 bg-neutral-50">
				<CardHeader className="font-roboto text-center border-b border-border text-blue-600 dark:text-blue-600 text-2xl font-bold ">
					Sistema de Gestión de Ingresos y Gastos
				</CardHeader>
				<Button
					onClick={handleLogin}
					className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-6 text-md font-medium transition-opacity cursor-pointer text-white bg-blue-500 hover:bg-blue-600 "
				>
					<GitHubIcon className="size-7 text-white" />
					Iniciar sesion con GitHub
				</Button>

				<CardFooter className=" text-sm text-center text-gray-400 mt-6">
					Al iniciar sesion se creara tu cuenta automaticamente
				</CardFooter>
			</Card>
		</div>
	);
}
