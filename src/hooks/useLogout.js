import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { getFirebaseErrorMessage } from "../components/ErrorId";
import { logout } from "../app/features/userSlice";
import { useDispatch } from "react-redux";

export function useLogout() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState();
  const [error, setError] = useState(null);

  const _logout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _logout, isPending, error };
}
