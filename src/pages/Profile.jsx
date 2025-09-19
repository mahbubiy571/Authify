import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";

function Profile() {
  const { user } = useSelector((store) => store.user);

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Check Your Email");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen 
      bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700"
    >
      <div className="w-96 backdrop-blur-md bg-white/20 shadow-2xl rounded-2xl border border-white/30">
        <div className="flex flex-col items-center p-8">
          <img
            src={
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || "User"
              )}&background=random`
            }
            alt={user?.displayName || "User"}
            className="rounded-full w-28 h-28 object-cover border-4 border-white shadow-md"
          />
          <h2 className="mt-4 text-xl font-bold text-white">
            {user?.displayName}
          </h2>
          <p className="text-sm text-gray-200">{user?.email}</p>

          <div className="mt-3">
            {user?.emailVerified ? (
              <span className="badge badge-success gap-2 px-3 py-2 text-sm">
                ✅ Email Verified
              </span>
            ) : (
              <span className="badge badge-warning gap-2 px-3 py-2 text-sm">
                ⚠️ Email Not Verified
              </span>
            )}
          </div>

          {!user?.emailVerified && (
            <button
              onClick={sendEmailLink}
              className="btn btn-primary rounded-xl mt-5 shadow-md"
            >
              Send Verification Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
