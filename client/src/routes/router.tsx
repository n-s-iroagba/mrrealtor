import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/common/Home";
import ProfileLayout from "../features/profile/layout/ProfileLayout";
import ListedBuildings from "../pages/common/ListedBuidings";
import ListLands from "../pages/realtor/LikedLands";
import ListedLands from "../pages/common/ListedLands";
import LikedBuildings from "../pages/realtor/LikedBuildings";
import LikedLands from "../pages/realtor/LikedLands";
import MyProfile from "../pages/realtor/MyProfile";
import RealtorProfile from "../pages/realtor/RealtorProfile";
import FutureAppointment from "../pages/realtor/FutureAppointments";
import Dashboard from "../pages/realtor/Dashboard";
import ListBuilding from "../pages/realtor/ListBuilding";
import RealtorChatList from "../pages/realtor/RealtorChatList";
import PastAppointment from "../pages/realtor/PastAppointments";
import NotificationLayout from "../notification/layout/NotificationLayout";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/realtor/chatlist',
        element: <RealtorChatList />
    },
    {
        path: '/newlisting',
        element: <ProfileLayout/>
    },
    {
        path: '/list/building',
        element: <ListBuilding />
    },
    {
        path: '/list/lands',
        element: <ListLands />
    },
    {
        path: '/listed/building',
        element: <ListedBuildings />
    },
    {
        path: '/listed/lands',
        element: <ListedLands />
    },
    {
        path: '/profile',
        element: <MyProfile />
    },
    {
        path: '/realtor-profile',
        element: <RealtorProfile />
    },
    {
        path: '/liked/building',
        element: <LikedBuildings />
    },
    {
        path: '/liked/lands',
        element: <LikedLands />
    },
    {
        path: '/past-appointment',
        element: <PastAppointment />
    },
    {
        path: '/future-appointment',
        element: <FutureAppointment />
    },

    {
        path: '/dashboard',
        element: <Dashboard />
    },

    {
        path: '/temp',
        element: <NotificationLayout/>
    },
    // {
    //     path: '/admin-profile',
    //     element: <AdminProfile />
    // }
]);
