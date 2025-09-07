import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { FaRegClipboard } from "react-icons/fa";

function Tasks() {
  const { data: tasks, loading } = useCollection("tasks", true);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
        <span className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
          <FaRegClipboard size={20} />
        </span>
        All Tasks
      </h2>

      {!loading && tasks?.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-medium">
          📋 No tasks found
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks &&
          tasks.map((task) => (
            <Link
              key={task.uid}
              to={`/task/${task.uid}`}
              className="block bg-white/70 backdrop-blur-lg rounded-2xl shadow-md 
                         p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <h5 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2">
                {task.title}
              </h5>

              <div className="flex -space-x-3">
                {task.attachedUsers.map((user) => (
                  <img
                    key={user.uid}
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.displayName || "User"
                      )}&background=random`
                    }
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition"
                    alt={user.displayName}
                    title={user.displayName}
                  />
                ))}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Tasks;
