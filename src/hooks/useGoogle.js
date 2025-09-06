import { useState } from "react";
import { auth, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { getFirebaseErrorMessage } from "../components/ErrorId";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useGoogle = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const googleProvider = async () => {
    setIsPending(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const req = await signInWithPopup(auth, provider);
      if (!req.user) throw new Error("Registration failed");

      const userRef = doc(db, "users", req.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          displayName: req.user.displayName,
          photoURL: req.user.photoURL,
          online: true,
          uid: req.user.uid,
        });
      }

      dispatch(login(req.user));
      console.log("Google user:", req.user);
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code || err.message));
      console.log("Google login error:", err.code || err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { googleProvider, isPending, error };
};
