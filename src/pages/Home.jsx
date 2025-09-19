import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router-dom";
import Tasks from "./Tasks";
import { FiEdit, FiLogOut } from "react-icons/fi";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data, loading, error: _error } = useCollection("users");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative">
      <div className="flex sm:flex-row sm:items-center sm:justify-between gap-1 px-4 sm:px-6 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 rounded-b-2xl">
        <h1 className="text-sm sm:text-2xl font-bold text-indigo-700 flex items-center flex-wrap">
          Welcome,
          <Link className="flex items-center" to="./profile">
            <span>
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="mx-1 w-6 h-6 rounded-full shadow-md object-cover"
              />
            </span>
            {user.displayName}
          </Link>
          👋
        </h1>

        {!isPending ? (
          <button
            onClick={_logout}
            className="flex ml-auto size-9 sm:size-11 p-2 sm:p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300"
            title="Logout"
          >
            <FiLogOut size={22} />
          </button>
        ) : (
          <button
            disabled
            className="p-2 sm:p-3 bg-gray-400 text-white rounded-full shadow-md"
            title="Loading..."
          >
            <FiLogOut size={22} className="animate-pulse" />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-bold text-base">
            Loading users...
          </p>
        </div>
      )}

      {!loading && (
        <>
          <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-md">
              <div className="text-indigo-600 text-3xl sm:text-4xl font-extrabold mb-2">
                {data?.length || 0}
              </div>
              <p className="text-gray-700 font-medium">Total Users</p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-md">
              <div className="text-green-600 text-3xl sm:text-4xl font-extrabold mb-2">
                {data?.filter((u) => u.online).length || 0}
              </div>
              <p className="text-gray-700 font-medium">Online Now</p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-md">
              <div className="text-purple-600 text-3xl sm:text-4xl font-extrabold mb-2">
                {data?.filter((u) => !u.online).length || 0}
              </div>
              <p className="text-gray-700 font-medium">Offline</p>
            </div>
          </div>

          {_error && (
            <div className="max-w-md mx-auto mb-10 px-4">
              <div className="bg-red-100 border border-red-300 text-center p-4 sm:p-6 rounded-xl shadow">
                <p className="text-red-700 font-medium text-sm sm:text-base">
                  {_error}
                </p>
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {data &&
              data.map((user) => (
                <Link key={user.uid} to={`/userinfo/${user.uid}`}>
                  <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:scale-105">
                    <div className="relative mb-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.displayName || "User"
                        )}&background=random`}
                        alt={user.displayName}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md mx-auto object-cover"
                      />
                      <span
                        className={`absolute bottom-2 right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white ${
                          user.online ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></span>
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                      {user.displayName}
                    </h2>
                    <p
                      className={`text-xs sm:text-sm font-medium mb-4 ${
                        user.online ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {user.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </Link>
              ))}
          </div>

          <Tasks />
        </>
      )}

      <Link
        to="/create"
        className="fixed bottom-8 right-8 flex items-center justify-center w-14 h-14
        bg-gradient-to-r from-sky-500 to-cyan-600 text-white rounded-full shadow-lg 
        hover:shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <FiEdit size={28} />
      </Link>
    </div>
  );
}

export default Home;
