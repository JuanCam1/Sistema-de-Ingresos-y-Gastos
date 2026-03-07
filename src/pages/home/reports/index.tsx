import CardList from "@/components/shared/cards-list";
import useUserList from "@/hooks/use-user-list";
import HomeLayout from "@/layouts/home-layout";
import { ReactElement } from "react";

export default function ReportPage() {
	const query = useUserList();

	const users = query.data?.data ?? [];
	const isLoading = query.isLoading;
	const error = query.error;

	return (
		<div className="w-full h-full flex flex-col items-center px-6 py-10">
			<h2 className="text-blue-700 text-5xl font-bold text-center mb-16 dark:text-white">
				Reportes
			</h2>
			<CardList
				error={error}
				isLoading={isLoading}
				users={users}
				action={(id) => console.log(id)}
			/>
		</div>
	);
}

ReportPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
