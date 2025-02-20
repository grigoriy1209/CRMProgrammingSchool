import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {LoginPage} from "./pages/LoginPage";
import {ApplicationPage} from "./pages/ApplicationPage";
import {ApplicationDetailsPage} from "./pages/ApplicationDetailsPage";

const router = createBrowserRouter([
    {
        path:'', element:<MainLayout/>, children:[
            {
                index: true, element:<Navigate to={'login'}/>
            },
            {
                path:'login', element:<LoginPage/>
            },
            {
                path: 'application', element:<ApplicationPage/>
            },
            {
                path: '/application/:id', element:<ApplicationDetailsPage/>
            }
        ]
    }
]);
export{
    router
}