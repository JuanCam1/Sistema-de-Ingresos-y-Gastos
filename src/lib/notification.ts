import { toast } from "sonner";

export function notification(
	message: string,
	type: "success" | "error" | "warning" = "success",
) {
	switch (type) {
		case "success":
			return toast.success(message);
		case "error":
			return toast.error(message);
		case "warning":
			return toast.warning(message);
	}
}
