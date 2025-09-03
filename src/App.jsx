import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { isAuthReady, login } from "./app/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady(true));
    });
  }, []);

  return (
    <>
      {authReady && (
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes user={user}>
                  <MainLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Home />} />
            </Route>

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
          </Routes>
        </HashRouter>
      )}
    </>
  );
}

export default App;
