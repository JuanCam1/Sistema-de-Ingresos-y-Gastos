import HomeLayout from "@/layouts/home-layout";
import { ReactElement } from "react";

export default function MovementsPage() {
	return <div>movimientos</div>;
}

MovementsPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
