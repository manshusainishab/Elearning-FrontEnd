import { render, screen, act } from "@testing-library/react";
import { UserContextProvider, UserData } from "./UserContext";
import { describe, it, expect, vi } from "vitest";
import { useEffect } from "react";

// Mock axios since it's used in UserContext
import axios from "axios";
vi.mock("axios");

const TestComponent = () => {
    const { user, isAuth, loginUser, loading } = UserData();
    return (
        <div>
            <div data-testid="auth-status">{isAuth ? "Authenticated" : "Not Authenticated"}</div>
            <div data-testid="user-name">{user?.name}</div>
            <div data-testid="loading-status">{loading ? "Loading" : "Loaded"}</div>
            <button onClick={() => loginUser("test@example.com", "password", vi.fn(), vi.fn())}>
                Login
            </button>
        </div>
    );
};

describe("UserContext", () => {
    it("provides user data and authentication status", async () => {
        const mockUser = { name: "John Doe", email: "john@example.com" };
        axios.get.mockResolvedValue({ data: { user: mockUser } });

        await act(async () => {
            render(
                <UserContextProvider>
                    <TestComponent />
                </UserContextProvider>
            );
        });

        expect(screen.getByTestId("loading-status")).toHaveTextContent("Loaded");
        expect(screen.getByTestId("auth-status")).toHaveTextContent("Authenticated");
        expect(screen.getByTestId("user-name")).toHaveTextContent("John Doe");
    });

    it("handles login successfully", async () => {
        const mockUser = { name: "John Doe", email: "john@example.com" };
        const mockToken = "mock-token";

        axios.get.mockResolvedValue({ data: { user: null } }); // Initial fetch
        axios.post.mockResolvedValue({
            data: {
                message: "Logged in",
                token: mockToken,
                user: mockUser
            }
        });

        await act(async () => {
            render(
                <UserContextProvider>
                    <TestComponent />
                </UserContextProvider>
            );
        });

        const loginBtn = screen.getByText("Login");
        await act(async () => {
            loginBtn.click();
        });

        expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/api/user/login"), {
            email: "test@example.com",
            password: "password",
        });
    });
});
