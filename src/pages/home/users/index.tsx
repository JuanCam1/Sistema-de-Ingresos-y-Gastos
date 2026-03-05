import HomeLayout from "@/layouts/home-layout";
import { ReactElement } from "react";

export default function UserPage() {
	return <div>usuarios</div>;
}

UserPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
