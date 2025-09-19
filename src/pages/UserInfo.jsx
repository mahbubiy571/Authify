import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { FiUser, FiMail, FiKey, FiShield, FiLock } from "react-icons/fi";

function UserInfo() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const ref = doc(db, "users", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUser(snap.data());
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-indigo-600 font-bold">Loading user...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">User not found ❌</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-6">
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
              <FiKey className="text-indigo-500 text-lg" />
              <span className="text-xs text-gray-500">UID</span>
            </div>
            <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
              {id}
            </span>
          </div>

          <div className="flex justify-between p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <FiUser className="text-purple-500 text-lg" />
              <span className="text-xs text-gray-500">Provider</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {user?.providerId || "Unknown"}
            </span>
          </div>

          <div className="flex justify-between p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <FiMail className="text-pink-500 text-lg" />
              <span className="text-xs text-gray-500">Email</span>
            </div>
            <span className="text-sm font-medium text-gray-800 break-all">
              {user?.email}
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

          <div className="flex justify-between p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <FiLock className="text-blue-500 text-lg" />
              <span className="text-xs text-gray-500">Password</span>
            </div>
            {user?.providerId === "password" ? (
              <span className="text-sm font-medium text-gray-800">
                Set (hidden) 🔒
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-500">
                No password (Google login)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
