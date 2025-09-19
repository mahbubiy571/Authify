import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { FiUser, FiMail, FiShield } from "react-icons/fi";

function Profile() {
  const { user } = useSelector((store) => store.user);

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Check Your Email 📩");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">No user found ❌</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/30 p-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || "User"
              )}&background=random`
            }
            alt={user?.displayName || "User"}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-indigo-300 shadow-md"
          />
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-gray-800">
            {user?.displayName || "Anonymous User"}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 break-all">
            {user?.email}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <FiMail className="text-indigo-500 text-lg" />
              <span className="text-xs text-gray-500">Email</span>
            </div>
            <span className="text-sm font-medium text-gray-800 break-all">
              {user?.email}
            </span>
          </div>

          <div className="flex justify-between p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <FiUser className="text-purple-500 text-lg" />
              <span className="text-xs text-gray-500">Name</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {user?.displayName || "No name"}
            </span>
          </div>

          <div className="flex justify-between p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <FiShield className="text-green-500 text-lg" />
              <span className="text-xs text-gray-500">Email Status</span>
            </div>
            {user?.emailVerified ? (
              <span className="text-sm font-medium text-green-600">
                Verified ✅
              </span>
            ) : (
              <span className="text-sm font-medium text-yellow-600">
                Not Verified ⚠️
              </span>
            )}
          </div>
        </div>

        {!user?.emailVerified && (
          <button
            onClick={sendEmailLink}
            className="w-full mt-6 py-2 px-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Send Verification Link
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
