import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { getFirebaseErrorMessage } from "../components/ErrorId";
import { logout } from "../app/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

export function useLogout() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState();
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.user);

  const _logout = async () => {
    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        online: false,
      });

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
