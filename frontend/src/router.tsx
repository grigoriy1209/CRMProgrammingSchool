import {createBrowserRouter, Navigate, Router} from "react-router-dom";
import {MainLayout} from "./layouts";
import {LoginPage, OrderDetailsPage, OrderPage} from "./pages";

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
                path:'application',element:<OrderPage/>,children:[
                    {
                        path:':id',element:<OrderDetailsPage/>
                    }
                ]
            }
        ]
    }

])
export {
    router
}