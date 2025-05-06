import {createBrowserRouter, Navigate, Router} from "react-router-dom";
import {MainLayout} from "./layouts";
import {AdminsPage, LoginPage, OrderDetailsPage, OrderPage, UsersPages} from "./pages";
import React from "react";



const router = createBrowserRouter([
    {
        path:'', element:<MainLayout/>,children:[
            {
                index:true, element:<Navigate to={'login'}/>
            },
            {
              path:"login", element:<LoginPage/>
            },
            {
                path:'application',element:<OrderPage/>
            },
            {
                path:'application/:id',element:<OrderDetailsPage/>
            },
            {
                path:'users', element:<UsersPages/>
            },
            {
                path:'admins',element:<AdminsPage/>
            }
        ]
    }

])
export {
    router
}