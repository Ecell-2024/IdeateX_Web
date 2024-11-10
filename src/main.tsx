import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './App';
import RegisterPage from './Register';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';

// Define the route configuration with type annotations
const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/register", element: <RegisterPage /> },
];

// Create the router instance
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
