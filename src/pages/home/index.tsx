import { useRouter } from "next/router";
import { HomeLayout } from "@/layouts/home-layout";
import { Card, CardContent } from "@/components/ui/card";
import { pathsSidebar } from "@/consts/paths-sidebar";
import { ReactElement } from "react";

export default function HomePage() {
	const router = useRouter();

	const handlePage = (path: string) => {
		router.push(path);
	};
	return (
		<div className="w-full h-full flex flex-col items-center px-6 py-10">
			<h2 className="text-blue-700 text-5xl font-bold text-center mb-16 dark:text-white font-roboto">
				Panel
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl mt-28">
				{pathsSidebar.slice(1, 4).map((card, index) => {
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
