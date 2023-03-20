import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import EditDetails from './pages/editDetails/EditDetails';

const routerFunction = user => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Register />,
    },
    {
      path: "/login",
      element: user ? <Navigate replace to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate replace to="/" /> : <Register />,
    },
    {
      path: "/profile/:username",
      element: user ? <Profile /> : <Navigate replace to="/" />
    },
    {
      path: "/profile/:username/edit",
      element: user ? <EditDetails /> : <Navigate replace to="/" />
    }
  ]);
  return router;
}

const App = () => {

  const { user } = useContext(AuthContext);

  return (
    <RouterProvider router={routerFunction(user)} />
  )
}

export default App