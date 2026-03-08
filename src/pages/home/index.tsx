import { ReactElement } from "react";
import { HomeLayout } from "@/layouts/home-layout";
import { Card, CardContent } from "@/components/ui/card";
import { pathsSidebar } from "@/consts/paths-sidebar";
import { useRouter } from "next/router";
import { useSession } from "@/lib/auth-client";
import { Loading } from "@/components/shared/loading";

export default function HomePage() {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	const handlePage = (path: string) => {
		router.push(path);
	};

	if (isPending || !session) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-muted">
				<Loading />
			</div>
		);
	}

	const filteredUser = pathsSidebar.filter((path) => {
		if (session.user.roleName === "Usuario") {
			return path.name === "Movimientos";
		}
		return true;
	});

	return (
		<div className="w-full h-full flex flex-col items-center px-6 py-10">
			<h2 className="text-blue-700 text-5xl font-bold text-center mb-16 dark:text-white font-roboto">
				Panel
			</h2>

			<div
				className={`grid w-full max-w-4xl mt-28
    	${filteredUser.length === 1 ? "place-items-center" : "grid-cols-1 md:grid-cols-4 place-content-center gap-8"}`}
			>
				{filteredUser.map((card, index) => {
					const Icon = card.icon;

					return (
						<Card
							key={index}
							className="aspect-square cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 bg-primary"
							onClick={() => handlePage(card.url)}
						>
							<CardContent className="flex flex-col items-center justify-center h-full text-center gap-6">
								<div className="p-5 rounded-full bg-primary/20">
									<Icon className="size-16 text-white" />
								</div>

								<h3 className="text-xl font-semibold text-white">
									{card.name}
								</h3>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
