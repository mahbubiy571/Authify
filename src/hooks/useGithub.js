import { useState } from "react";
import { auth, db } from "../firebase/config";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { getFirebaseErrorMessage } from "../components/ErrorId";
import { doc, setDoc } from "firebase/firestore";

export const useGithub = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const githubProvider = async () => {
    const provider = new GithubAuthProvider();
    try {
      setIsPending(true);
      const req = await signInWithPopup(auth, provider);

      if (!req.user) {
        throw new Error("Registration failed");
      }

      await setDoc(doc(db, "users", req.user.uid), {
        displayName: req.user.displayName,
        photoURL: req.user.photoURL,
        online: true,
        uid: req.user.uid,
      });

      dispatch(login(req.user));
      console.log(req.user);
    } catch (error) {
      setError(getFirebaseErrorMessage(error.code || error.message));
      console.log(error.code || error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { githubProvider, isPending, error };
};
