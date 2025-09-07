import { useCollection } from "../hooks/useCollection";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

function CreateTask() {
  const navigate = useNavigate();
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState([]);
  const [attachedUsers, setattachedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const users = data.map((user) => {
        return {
          value: user.uid,
          label: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        };
      });
      setUserOptions(users || []);
      setLoading(false);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("due-to");

    const task = {
      title,
      description,
      dueTo,
      attachedUsers: attachedUsers.map((u) => ({
        uid: u.uid,
        displayName: u.label,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          u.label || "User"
        )}&background=random`,
      })),
      comments: [],
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "tasks"), task);

    alert("qo'shildi");
    navigate("/");
    console.log(task);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-90 sm:w-100 md:w-110 max-w-lg shadow-2xl bg-base-100 mx-5 relative">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-xl z-10">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-pink-600 font-medium text-sm mt-2 animate-pulse">
              Loading users...
            </p>
          </div>
        )}

        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Create Task</h2>
          <Link
            to="/"
            className="absolute top-4 right-4 flex items-center gap-2 px-2.5 py-2 m-1.5 
             bg-gradient-to-r from-pink-500 to-purple-600 
             text-white rounded-full shadow-md hover:scale-110 
             transition-all duration-300"
          >
            <AiOutlineHome size={22} />
          </Link>

          <form onSubmit={handleSubmit} method="post" className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter task title"
                className="input input-border focus:outline-none focus:border-pink-500 shadow-pink-500 focus:shadow-lg focus:shadow-pink-400/50 rounded w-full h-9.5"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Write task description"
                className="textarea textarea-bordered focus:outline-none focus:border-pink-500 focus:shadow-lg focus:shadow-pink-400/50 shadow-pink-500 rounded w-full"
                rows="4"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Due Date</span>
              </label>
              <input
                name="due-to"
                type="date"
                className="input input-border focus:outline-none focus:border-purple-600 shadow-to-purple-600 focus:shadow-lg focus:shadow-purple-400/50 rounded w-full h-9.5"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Assign Users</span>
              </label>
              <Select
                isMulti
                name="Users"
                options={userOptions}
                value={attachedUsers}
                onChange={setattachedUsers}
                className="react-select-container"
                classNamePrefix="react-select"
                formatOptionLabel={(option) => (
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full border border-gray-200">
                        <img
                          src={
                            option.photoURL ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              option.label || "User"
                            )}&background=random`
                          }
                          alt={option.label}
                        />
                      </div>
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                  </div>
                )}
              />
            </div>

            <div className="form-control mt-6">
              <button
                className="btn w-full text-[17px] font-semibold 
            bg-gradient-to-r from-pink-500 to-purple-600
             hover:from-pink-700 hover:to-purple-700 
             text-white rounded-xl shadow-lg transition-normal duration-300"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
