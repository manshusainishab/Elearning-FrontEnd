import { http, HttpResponse } from 'msw';

const serverUrl = 'http://localhost:5000'; // Default fallback, but should match import.meta.env.VITE_BACKEND

export const handlers = [
  // User Authentication
  http.post(`${serverUrl}/api/user/login`, () => {
    return HttpResponse.json({
      message: "Welcome back",
      token: "mock-token",
      user: {
        _id: "user-123",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      }
    });
  }),

  http.post(`${serverUrl}/api/user/register`, () => {
    return HttpResponse.json({
      message: "OTP sent to your email",
      activationToken: "mock-activation-token"
    });
  }),

  http.post(`${serverUrl}/api/user/verify`, () => {
    return HttpResponse.json({
      message: "Account verified successfully"
    });
  }),

  http.get(`${serverUrl}/api/user/me`, ({ request }) => {
    const token = request.headers.get('token');
    if (!token) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json({
      user: {
        _id: "user-123",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      }
    });
  }),

  // Courses
  http.get(`${serverUrl}/api/course/all`, () => {
    return HttpResponse.json({
      courses: [
        {
          _id: "course-1",
          title: "React Mastery",
          description: "Learn React from scratch",
          price: 499,
          duration: 10,
          category: "Web Development",
          image: "react.jpg"
        }
      ]
    });
  }),

  http.get(`${serverUrl}/api/course/:id`, ({ params }) => {
    return HttpResponse.json({
      course: {
        _id: params.id,
        title: "React Mastery",
        description: "Learn React from scratch",
        price: 499,
        duration: 10,
        category: "Web Development",
        image: "react.jpg"
      }
    });
  }),

  http.get(`${serverUrl}/api/mycourse`, () => {
    return HttpResponse.json({
      courses: []
    });
  }),
];
