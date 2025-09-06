import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router-dom";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  const { data: tasks } = useCollection("tasks");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 rounded-b-2xl">
        <h1 className="text-2xl font-bold text-indigo-700 flex items-center">
          Welcome,
          <span>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || "User"
              )}&background=random`}
              alt={user.displayName}
              className="mx-1 w-6 h-6 rounded-full shadow-md object-cover"
            />
          </span>{" "}
          {user.displayName} 👋
        </h1>
        <div>
          <Link className="btn btn-primary" to="/create">
            Create
          </Link>
        </div>

        {!isPending ? (
          <button
            onClick={_logout}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            disabled
            className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-xl shadow-md"
          >
            Loading...
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-md">
          <div className="text-indigo-600 text-4xl font-extrabold mb-2">
            {data?.length || 0}
          </div>
          <p className="text-gray-700 font-medium">Total Users</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-md">
          <div className="text-green-600 text-4xl font-extrabold mb-2">
            {data?.filter((u) => u.online).length || 0}
          </div>
          <p className="text-gray-700 font-medium">Online Now</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-md">
          <div className="text-purple-600 text-4xl font-extrabold mb-2">
            {data?.filter((u) => !u.online).length || 0}
          </div>
          <p className="text-gray-700 font-medium">Offline</p>
        </div>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-10">
          <div className="bg-red-100 border border-red-300 text-center p-6 rounded-xl shadow">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
        {data &&
          data.map((user) => (
            <div
              key={user.uid}
              className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || "User"
                  )}&background=random`}
                  alt={user.displayName}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto object-cover"
                />
                <span
                  className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white ${
                    user.online ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {user.displayName}
              </h2>
              <p
                className={`text-sm font-medium mb-4 ${
                  user.online ? "text-green-600" : "text-gray-500"
                }`}
              >
                {user.online ? "Online" : "Offline"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
