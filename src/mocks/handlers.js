import { http, HttpResponse } from 'msw';

// Mock data
const mockUser = {
    _id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
};

const mockCourses = [
    {
        _id: 'course1',
        title: 'React Basics',
        description: 'Learn React from scratch',
        image: 'react.png',
        price: 499,
        createdBy: 'Instructor A',
        duration: '10h',
        category: 'Web Development',
    },
    {
        _id: 'course2',
        title: 'Advanced Node.js',
        description: 'Master Node.js',
        image: 'node.png',
        price: 699,
        createdBy: 'Instructor B',
        duration: '12h',
        category: 'Backend',
    },
];

export const handlers = [
    // Login
    http.post('*/api/user/login', async ({ request }) => {
        const { email, password } = await request.json();

        if (email === 'test@example.com' && password === 'password123') {
            return HttpResponse.json({
                message: 'Welcome back',
                token: 'mock-token',
                user: mockUser,
            });
        }

        return HttpResponse.json(
            { message: 'Invalid credentials' },
            { status: 400 }
        );
    }),

    // Register
    http.post('*/api/user/register', async ({ request }) => {
        const { email } = await request.json();

        if (email === 'existing@example.com') {
            return HttpResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        return HttpResponse.json({
            message: 'Registration successful',
            activationToken: 'mock-activation-token',
        });
    }),

    // Verify OTP
    http.post('*/api/user/verify', async ({ request }) => {
        const { otp } = await request.json();
        if (otp === "123456") {
            return HttpResponse.json({
                message: "Account Verified",
            })
        }
        return HttpResponse.json({
            message: "Invalid OTP"
        }, { status: 400 })
    }),

    // Get User Profile
    http.get('*/api/user/me', ({ request }) => {
        const token = request.headers.get('token');

        if (token === 'mock-token') {
            return HttpResponse.json({ user: mockUser });
        }

        return HttpResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }),

    // Get All Courses
    http.get('*/api/course/all', () => {
        return HttpResponse.json({ courses: mockCourses });
    }),

    // Get My Courses
    http.get('*/api/mycourse', ({ request }) => {
        const token = request.headers.get('token');
        if (token === 'mock-token') {
            return HttpResponse.json({ courses: [mockCourses[0]] });
        }
        return HttpResponse.json({ courses: [] });
    }),

    // Get Single Course
    http.get('*/api/course/:id', ({ params }) => {
        const { id } = params;
        const course = mockCourses.find(c => c._id === id);

        if (course) {
            return HttpResponse.json({ course });
        }
        return HttpResponse.json({ message: "Course not found" }, { status: 404 });
    })
];
