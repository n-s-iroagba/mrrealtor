import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import ChatLayout from "../features/chat/layout/ChatLayout";



export const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    },
   {
        path: '/chat/:realtorId',
        element: <ChatLayout />
    },
   
])