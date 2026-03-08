import { ReactElement, useState } from "react";
import useUserList from "@/hooks/use-user-list";
import { HomeLayout } from "@/layouts/home-layout";
import { UserModel } from "@/models/user-model";
import { DialogMovement } from "@/components/movements/dialog-movement";
import { CardList } from "@/components/shared/cards-list";

export default function MovementsPage() {
	const query = useUserList();
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
		<>
			<div className="w-full h-full flex flex-col items-center px-6 py-10">
				<h2 className="text-blue-700 text-5xl font-bold text-center mb-16 dark:text-white">
					Movimientos
				</h2>
				<CardList
					error={error}
					isLoading={isLoading}
					users={users}
					action={handleCardClick}
				/>
			</div>

			{userSelected && showModel && (
				<DialogMovement
					userSelected={userSelected}
					showModel={showModel}
					handleCloseModel={handleCloseModel}
				/>
			)}
		</>
	);
}

MovementsPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
