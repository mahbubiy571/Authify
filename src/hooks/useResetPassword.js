import { auth } from "../firebase/config";
import { formError } from "../components/ErrorId";
import { sendPasswordResetEmail } from "firebase/auth";

export const useResetPassword = () => {
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Check your email");
    } catch (error) {
      const errorMessage = error.message;
      formError(errorMessage);
    }
  };

  return { resetPassword };
};
