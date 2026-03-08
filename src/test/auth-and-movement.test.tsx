import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCreateMovement } from "@/hooks/use-create-movement";
import LoginPage from "@/pages/index";

const mockRefs = vi.hoisted(() => ({
	replaceMock: vi.fn(),
	signInSocialMock: vi.fn(),
	fetchCreateMovementMock: vi.fn(),
	notificationMock: vi.fn(),
	sessionState: {
		data: null as null | { user: { id: string } },
		isPending: false,
	},
}));

vi.mock("next/router", () => ({
	useRouter: () => ({ replace: mockRefs.replaceMock }),
}));

vi.mock("@/lib/auth-client", () => ({
	useSession: () => mockRefs.sessionState,
	signIn: {
		social: mockRefs.signInSocialMock,
	},
}));

vi.mock("@/fetchers/movement-fetcher", () => ({
	fetchCreateMovement: (data: unknown) => mockRefs.fetchCreateMovementMock(data),
}));

vi.mock("@/lib/notification", () => ({
	notification: (message: string, type: "success" | "error" | "warning") =>
		mockRefs.notificationMock(message, type),
}));

describe("Flujos clave", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockRefs.sessionState.data = null;
		mockRefs.sessionState.isPending = false;
	});

	it("Index dispara login con GitHub usando Better Auth", async () => {
		mockRefs.signInSocialMock.mockResolvedValue(undefined);
		render(<LoginPage />);

		await userEvent.click(
			screen.getByRole("button", { name: /iniciar sesion con github/i }),
		);

		expect(mockRefs.signInSocialMock).toHaveBeenCalledWith({
			provider: "github",
			callbackURL: "/home",
		});
	});

	it("Index redirige a /home cuando ya existe sesión", async () => {
		mockRefs.sessionState.data = { user: { id: "u-1" } };
		mockRefs.sessionState.isPending = false;
		render(<LoginPage />);

		await waitFor(() => {
			expect(mockRefs.replaceMock).toHaveBeenCalledWith("/home");
		});
	});

	it("useCreateMovement crea movimiento y ejecuta side effects de éxito", async () => {
		vi.useFakeTimers();
		mockRefs.fetchCreateMovementMock.mockResolvedValue({ id: 123 });
		const handleClose = vi.fn();

		const queryClient = new QueryClient({
			defaultOptions: {
				queries: { retry: false },
				mutations: { retry: false },
			},
		});
		const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

		const wrapper = ({ children }: { children: ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useCreateMovement({ handleClose }), {
			wrapper,
		});

		const payload = {
			userId: "user-1",
			typeMovement: "1",
			amount: "50000",
			fecha: "2026-03-08T15:00:00.000Z",
		};

		await act(async () => {
			await result.current.mutateAsync(payload);
		});

		expect(mockRefs.fetchCreateMovementMock).toHaveBeenCalledWith(payload);
		expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["movements"] });
		expect(mockRefs.notificationMock).toHaveBeenCalledWith(
			"Movimiento creado satisfactoriamente",
			"success",
		);
		expect(handleClose).not.toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		expect(handleClose).toHaveBeenCalledTimes(1);
		vi.useRealTimers();
	});
});
