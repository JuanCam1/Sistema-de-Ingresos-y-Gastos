import HomeLayout from "@/layouts/home-layout";
import { ReactElement } from "react";

export default function ReportPage() {
	return <div>reportes</div>;
}

ReportPage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
