import { ReactElement, useState } from "react";
import { columnsUser } from "@/components/shared/table-users/columns-user";
import { DataTableUser } from "@/components/shared/table-users/data-table-user";
import { DialogUpdateUser } from "@/components/users/dialog-update-user";
import { HomeLayout } from "@/layouts/home-layout";
import { UserModel } from "@/models/user-model";
import { AdminGuard } from "@/guards/admin-guard";

export default function UserPage() {
	const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
	const [open, setOpen] = useState(false);

	const handleEdit = (user: UserModel) => {
		setSelectedUser(user);
		setOpen(true);
	};

	const handleClose = () => {
		setSelectedUser(null);
		setOpen(false);
	};

	const columns = columnsUser(handleEdit);
	return (
		<AdminGuard>
			<div className="flex flex-col justify-center items-center h-full">
				<h2 className="text-accent text-5xl font-bold text-center text-blue-800 dark:text-white">
					Usuarios
				</h2>
				<DataTableUser columns={columns} />

				{selectedUser && open && (
					<DialogUpdateUser
						userSelected={selectedUser}
						showModel={open}
						handleCloseModel={handleClose}
					/>
				)}
			</div>
		</AdminGuard>
	);
}

UserPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
