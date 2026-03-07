import { useRouter } from "next/router";
import HomeLayout from "@/layouts/home-layout";
import { Card, CardContent } from "@/components/ui/card";
import { pathsSidebar } from "@/consts/paths-sidebar";
import { ReactElement } from "react";

export default function HomePage() {
	const router = useRouter();

	const handlePage = (path: string) => {
		router.push(path);
	};
	return (
		<div className="flex flex-col justify-center items-center  h-full">
			<h2 className="text-accent text-5xl font-semibold text-center dark:text-white">
				Panel
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-250 mt-32">
				{pathsSidebar.slice(1, 4).map((card, index) => {
					const Icon = card.icon;

					return (
						<Card
							key={index}
							className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 bg-primary"
							onClick={() => handlePage(card.url)}
						>
							<CardContent className="flex flex-col items-center justify-center text-center p-8 gap-4">
								<div className="p-4 rounded-full bg-primary/10">
									<Icon className="size-16 text-white" />
								</div>

								<h3 className="text-lg font-semibold text-white">
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
