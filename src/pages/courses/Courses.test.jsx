import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Courses from "./Courses";
import { CourseContextProvider } from "../../context/CourseContext";
import { UserContextProvider } from "../../context/UserContext";

const MockProviders = ({ children }) => (
    <BrowserRouter>
        <UserContextProvider>
            <CourseContextProvider>{children}</CourseContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);

describe("Courses Page Integration", () => {
    it("fetches and displays courses", async () => {
        render(
            <MockProviders>
                <Courses />
            </MockProviders>
        );

        // Initial loading or empty state might be present, but we wait for data
        await waitFor(() => {
            expect(screen.getByText("React Basics")).toBeInTheDocument();
            expect(screen.getByText("Advanced Node.js")).toBeInTheDocument();
        });
    });
});
