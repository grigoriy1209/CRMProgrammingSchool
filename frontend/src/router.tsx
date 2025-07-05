import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {AdminsPage, GroupPage, LoginPage, OrderDetailsPage, OrderPage, UsersPages} from "./pages";
import React from "react";
import {SessionExpired} from "./components/ErrorComponent/SessionExpired";


const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <Navigate to={'login'}/>
            },
            {
              path: 'session-expired', element: <SessionExpired/>
            },
            {
                path: "login", element: <LoginPage/>
            },
            {
                path: 'application', element: <OrderPage/>
            },
            {
                path: 'application/:id', element: <OrderDetailsPage/>
            },
            {
                path: 'group', element: <GroupPage/>
            },
            {
                path: 'users', element: <UsersPages/>
            },
            {
                path: 'admins', element: <AdminsPage/>
            }
        ]
    }

])
export {
    router
}