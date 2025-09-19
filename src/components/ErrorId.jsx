export const formError = (data) => {
  if (!data?.name) return "Name is required";
  if (!data?.email) return "Email is required";
  if (!data?.password) return "Password is required";
  return null;
};

export function getFirebaseErrorMessage(error) {
  if (!error) return "An unknown error occurred.";

  const match = error.match(/\(auth\/[^\)]+\)/);

  if (!match) return "Something went wrong. Please try again.";

  const code = match[0].replace(/[()]/g, "");

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";

    case "auth/account-exists-with-different-credential":
      return "This email is already registered. Please try logging in with a different method.";

    case "auth/invalid-email":
      return "The email address is not valid.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/network-request-failed":
      return "Network error. Please check your connection.";

    case "auth/too-many-requests":
      return "Too many login attempts. Please wait and try again.";

    case "auth/popup-closed-by-user":
      return "The login popup was closed before completing sign in.";

    case "auth/cancelled-popup-request":
      return "A previous login popup was closed. Please try again.";

    case "auth/popup-blocked":
      return "The login popup was blocked by your browser. Please allow popups and try again.";

    default:
      return "An unknown error occurred.";
  }
}
