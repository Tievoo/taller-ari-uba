import { createBrowserRouter } from "react-router";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import MyBookings from "./pages/MyBookings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "reservation/:id", element: <Reservation /> },
            { path: "my-bookings", element: <MyBookings /> },
        ],
    },
]);

export default router;
