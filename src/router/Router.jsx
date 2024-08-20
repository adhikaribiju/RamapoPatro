import React from 'react'

import {createBrowserRouter,} from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import RegEvents from '../pages/RegEvents';
import CalendarPage from '../pages/CalendarPage';
import CreateEvent from '../pages/CreateEvent';
import CreateUserData from '../pages/CreateUserData';
import UpdateEvent from '../pages/UpdateEvent';
import EventDetails from '../pages/EventDetails';
import Login from '../pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PostedEvents from '../pages/PostedEvents';
import UpdateUserData from '../pages/UpdateUserData';
import SignUp from '../pages/Signup';
import Welcome from '../components/Welcome';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/posted-events",
            element: <PrivateRoute><PostedEvents/></PrivateRoute>
        },
        {
          path: "/reg-events",
          element: <PrivateRoute><RegEvents/></PrivateRoute>
      },
        {
            path: "/calendar",
            element: <CalendarPage/>
        },
        {
          path: "/post-event",
          element: <PrivateRoute><CreateEvent/></PrivateRoute>
        },
        {
          path: "/class-schedule",
          element: <PrivateRoute><CreateUserData/></PrivateRoute>
        },
        {
          path: "edit-event/:id",
          element: <UpdateEvent/>,
          loader: ({params}) => fetch(`https://ramapopatro-backend.onrender.com/all-events/${params.id}`)
        },
        {
          path: "/update-userdata",
          element: <PrivateRoute><UpdateUserData/></PrivateRoute>,
          loader: ({params}) => fetch(`https://ramapopatro-backend.onrender.com/update-userdata/${params.email}`)
        },
        {
          path:"/events/:id",
          element: <EventDetails/>,
        },
        {
          path:"/welcome",
          element: <PrivateRoute><Welcome/></PrivateRoute>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    }
  ]);

  export default router;