import { render, screen, act } from "@testing-library/react";
import { CourseContextProvider, CourseData } from "./CourseContext";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

const TestComponent = () => {
    const { courses } = CourseData();
    return (
        <div>
            <ul>
                {courses.map((c) => (
                    <li key={c._id} data-testid="course-item">
                        {c.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

describe("CourseContext", () => {
    it("fetches and provides courses on mount", async () => {
        const mockCourses = [
            { _id: "1", title: "Course 1" },
            { _id: "2", title: "Course 2" },
        ];

        axios.get.mockImplementation((url) => {
            if (url.includes("/api/course/all")) {
                return Promise.resolve({ data: { courses: mockCourses } });
            }
            return Promise.resolve({ data: { courses: [] } });
        });

        await act(async () => {
            render(
                <CourseContextProvider>
                    <TestComponent />
                </CourseContextProvider>
            );
        });

        const items = await screen.findAllByTestId("course-item");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent("Course 1");
    });
});
