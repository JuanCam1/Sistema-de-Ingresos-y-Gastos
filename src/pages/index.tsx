import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import GitHubIcon from "@/components/icons/github-icon";

export default function LoginPage() {
	const router = useRouter();

	const handleLogin = () => {
		router.push("/home");
	};

	return (
		<div className="flex min-h-screen items-center justify-center ">
			<Card className="w-full max-w-sm p-8 bg-neutral-50">
				<CardHeader className="text-center border-b border-border text-accent dark:text-accent text-2xl font-bold ">
					Sistema de Gestión de Ingresos y Gastos
				</CardHeader>

				<Button
					onClick={handleLogin}
					className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-5 text-sm font-medium transition-opacity cursor-pointer text-white bg-blue-500 hover:bg-blue-600"
				>
					<GitHubIcon className="size-5 text-white" />
					Iniciar sesion con GitHub
				</Button>

				<CardFooter className="text-xs text-center text-gray-400">
					Al iniciar sesion se creara tu cuenta automaticamente
				</CardFooter>
			</Card>
		</div>
	);
}
