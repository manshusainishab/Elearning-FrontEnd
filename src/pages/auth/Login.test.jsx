import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { UserContextProvider } from "../../context/UserContext";
import { CourseContextProvider } from "../../context/CourseContext";
import toast from "react-hot-toast";

// We don't need to mock axios directly anymore, MSW handles it.
// keeping the structure but removing direct axios mocks.

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
    Toaster: () => <div>Toaster</div>,
}));

const MockProviders = ({ children }) => (
    <BrowserRouter>
        <UserContextProvider>
            <CourseContextProvider>
                {children}
            </CourseContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);

describe("Login Page Integration", () => {
    it("renders login form correctly", () => {
        render(
            <MockProviders>
                <Login />
            </MockProviders>
        );

        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
    });

    it("allows entering credentials", () => {
        render(
            <MockProviders>
                <Login />
            </MockProviders>
        );

        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput.value).toBe("test@example.com");
        expect(passwordInput.value).toBe("password123");
    });

    it("handles successful login", async () => {
        render(
            <MockProviders>
                <Login />
            </MockProviders>
        );

        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

        const submitBtn = screen.getByRole("button", { name: /Sign In/i });
        fireEvent.click(submitBtn);

        // Wait for success toast or redirection handling (mocked via toast usually, but here checking effect)
        // Since we are not mocking toaster call specifically to assert, we can wait for button to not be loading or some side effect.
        // But for integration, checking if the success message appears from toast is good if Toaster is present.

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Welcome back");
        });
    });

    it("handles login failure", async () => {
        render(
            <MockProviders>
                <Login />
            </MockProviders>
        );

        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "wrong@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "wrongpass" } });

        fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
        });
    });
});
