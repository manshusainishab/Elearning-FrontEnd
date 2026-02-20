import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
    it("renders navigation links for non-authenticated users", () => {
        render(
            <BrowserRouter>
                <Header isAuth={false} />
            </BrowserRouter>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Courses/i)).toBeInTheDocument();
        expect(screen.getByText(/About/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.queryByText(/Account/i)).not.toBeInTheDocument();
    });

    it("renders navigation links for authenticated users", () => {
        render(
            <BrowserRouter>
                <Header isAuth={true} />
            </BrowserRouter>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Courses/i)).toBeInTheDocument();
        expect(screen.getByText(/About/i)).toBeInTheDocument();
        expect(screen.getByText(/Account/i)).toBeInTheDocument();
        expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    });
});
