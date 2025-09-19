import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { auth } from "./firebase/config";
import { isAuthReady, login } from "./app/features/userSlice";
import {
  Home,
  Login,
  Register,
  CreateTask,
  Task,
  Profile,
} from "./pages/index";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import UserInfo from "./pages/UserInfo";

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
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/userinfo/:id",
          element: <UserInfo />,
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
