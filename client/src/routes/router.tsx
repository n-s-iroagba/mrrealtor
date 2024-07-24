import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import ChatLayout from "../features/chat/layout/ChatLayout";
import ChatSummary from "../features/chat/layout/ChatSummary";
import NewListingForm from "../features/listing/layout/NewListingForm";
import ListingDetails from "../page/ListingDetail";



export const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    },
   {
        path: '/chat/',
        element: <ChatSummary userId={1} />
    },

    {
        path: '/newlisting',
        element: <ListingDetails />
    },

   
])