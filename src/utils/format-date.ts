export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	const day = date.toLocaleDateString("es-ES", { day: "2-digit" });
	const month = date.toLocaleDateString("es-ES", { month: "long" });
	const year = date.getFullYear();

	return `${day} de ${month} ${year}`;
};
