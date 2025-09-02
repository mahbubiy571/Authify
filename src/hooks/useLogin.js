import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { getFirebaseErrorMessage } from "../components/ErrorId";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const _login = async (email, password) => {
    try {
      setIsPending(true);
      const req = await signInWithEmailAndPassword(auth, email, password);

      if (!req.user) {
        throw new Error("Registration failed");
      }

      dispatch(login(req.user));
      console.log(req.user);
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _login, isPending, error };
};
