import HomeLayout from "@/layouts/home-layout";
import { ReactElement } from "react";

export default function HomePage() {
	return <h1>Bienvenido al Home</h1>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <HomeLayout>{page}</HomeLayout>;
};
