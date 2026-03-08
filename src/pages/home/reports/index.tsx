import { ReactElement, useState } from "react";
import { DialogReport } from "@/components/reports/dialog-report";
import { CardList } from "@/components/shared/cards-list";
import { useUserList } from "@/hooks/use-user-list";
import { HomeLayout } from "@/layouts/home-layout";
import { UserModel } from "@/models/user-model";
import { AdminGuard } from "@/guards/admin-guard";

export default function ReportPage() {
	const query = useUserList({
		roleId: 2,
		userId: undefined,
	});

	const [userSelected, setUserSelected] = useState<UserModel | null>(null);
	const [showModel, setShowModel] = useState(false);

	const users = query.data?.data ?? [];
	const isLoading = query.isLoading;
	const error = query.error;

	const handleCardClick = (user: UserModel | null) => {
		setUserSelected(user);
		setShowModel(true);
	};

	const handleCloseModel = () => {
		setShowModel(false);
		setUserSelected(null);
	};

	return (
		<AdminGuard>
			<div className="w-full h-full flex flex-col items-center px-6 py-10">
				<h2 className="text-blue-700 text-5xl font-bold text-center mb-16 dark:text-white">
					Reportes
				</h2>
				<CardList
					error={error}
					isLoading={isLoading}
					users={users}
					action={handleCardClick}
				/>
			</div>

			{userSelected && showModel && (
				<DialogReport
					userSelected={userSelected}
					showModel={showModel}
					handleCloseModel={handleCloseModel}
				/>
			)}
		</AdminGuard>
	);
}

ReportPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
