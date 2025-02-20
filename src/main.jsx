import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainn from './Layout/Mainn.jsx';
import Home from './components/Home/Home.jsx';
import LogIn from './components/LogIn/LogIn.jsx';
import Register from './components/Register/Register.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainn></Mainn>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:'LogIn',
        element:<LogIn></LogIn>
      },
      {
        path:'register',
        element:<Register></Register>
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
