import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register, { action } from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { isAuthReady, login } from "./app/features/userSlice";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/Task";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <CreateTask />,
        },
        {
          path: "/task/:id",
          element: <Task />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady(true));
    });
  }, []);
  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
