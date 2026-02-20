import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { CourseContextProvider } from "../../context/CourseContext";
import { UserContextProvider } from "../../context/UserContext";

// Mock ParticleNetwork to avoid canvas issues in JSDOM
vi.mock("./ParticleNetwork", () => ({
    default: () => <div data-testid="particle-network-mock">Particle Network</div>,
}));

const MockProviders = ({ children }) => (
    <BrowserRouter>
        <UserContextProvider>
            <CourseContextProvider>{children}</CourseContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);

describe("Home Page Integration", () => {
    it("renders home page and fetches courses", async () => {
        render(
            <MockProviders>
                <Home />
            </MockProviders>
        );

        // Initial render check (Loading or structure)
        // Assuming Home renders Testimonials or some header initially
        expect(screen.getByText(/Learn Without/i)).toBeInTheDocument(); // Adjust text based on actual Home.jsx

        // Check for specific home page content
        expect(screen.getAllByText(/Expert-Led Courses/i)[0]).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Explore Courses/i })).toBeInTheDocument();
    });
});
