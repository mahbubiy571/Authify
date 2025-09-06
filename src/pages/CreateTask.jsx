import { useCollection } from "../hooks/useCollection";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const navigate = useNavigate();
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState([]);
  const [attachedUsers, setattachedUsers] = useState([]);

  useEffect(() => {
    const users = data?.map((user) => {
      return {
        value: user.uid,
        label: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    });
    setUserOptions(users || []);
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
      attachedUsers,
      comments: [],
    };

    await addDoc(collection(db, "tasks"), {
      ...task,
    }).then(() => {
      alert("qo'shildi");
      navigate("/");
    });
    console.log(task);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-lg shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Create Task</h2>

          <form onSubmit={handleSubmit} method="post" className="space-y-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter task title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Write task description"
                className="textarea textarea-bordered w-full"
                rows="4"
                required
              />
            </div>

            {/* Due Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Due Date</span>
              </label>
              <input
                name="due-to"
                type="date"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Users */}
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

            {/* Submit */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
