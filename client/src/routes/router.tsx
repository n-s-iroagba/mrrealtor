import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/common/Home";

import ListedBuildings from "../pages/common/ListedBuidings";

import ListedLands from "../pages/common/ListedLands";
import LikedBuildings from "../pages/realtor/LikedBuildings";
import LikedLands from "../pages/realtor/LikedLands";
import MyProfile from "../pages/realtor/MyProfile";
import RealtorProfile from "../pages/realtor/RealtorProfile";
import FutureAppointment from "../pages/realtor/FutureAppointments";
import Dashboard from "../pages/realtor/Dashboard";

import RealtorChatList from "../pages/realtor/RealtorChatList";
import PastAppointment from "../pages/realtor/PastAppointments";

import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import BuildingDetails from "../features/listing/layout/BuildingDetails";

import BuildingSearchListing from "../pages/realtor/BuildingSearchListingLayout";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/realtor/chatlist',
        element: <RealtorChatList />
    },

    {
        path: '/building/:commercialType',
        element: <BuildingSearchListing/>
    },
    
    {
        path: '/buildings/:id',
        element: <BuildingDetails />
    },
  
    {
        path: '/land/:commercialPurpose',
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

    // {
    //     path: '/temp',
    //     element:
    // }
    // {
    //     path: '/admin-profile',
    //     element: <AdminProfile /
    // }
]);
