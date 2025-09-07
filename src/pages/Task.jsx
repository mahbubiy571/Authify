import { useParams, Link } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { FiSend, FiArrowLeft } from "react-icons/fi";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    if (!comment.trim()) return;

    const newComment = {
      text: comment,
      id: Math.random(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    const commentRef = doc(db, "tasks", data.id);
    await updateDoc(commentRef, {
      comments: [...(data.comments || []), newComment],
    });
    e.target.reset();
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-indigo-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-bl from-indigo-950 via-slate-900 to-gray-800">
      <div className="flex flex-col h-screen max-w-3xl mx-auto bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="flex items-center gap-3 p-1.5 sm:p-2.5 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-500 text-white shadow-md sticky top-0 z-50">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <FiArrowLeft size={22} />
          </Link>
          <h1 className="text-lg font-semibold">Task - {data.title}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {data.comments.length === 0 ? (
            <p className="text-gray-500 italic text-center mt-10">
              No Comments
            </p>
          ) : (
            data.comments.map((comment) => {
              const isMine = comment.uid === user.uid;
              return (
                <div
                  key={comment.id}
                  className={`flex items-end gap-2 ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isMine && (
                    <img
                      src={comment.photoURL}
                      alt={comment.displayName}
                      className="w-8 h-8 rounded-full shadow"
                    />
                  )}

                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl shadow text-sm ${
                      isMine
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{comment.text}</p>
                    <span
                      className={`text-[10px] block mt-1 ${
                        isMine ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {comment.displayName}
                    </span>
                  </div>

                  {isMine && (
                    <img
                      src={comment.photoURL}
                      alt={comment.displayName}
                      className="w-8 h-8 rounded-full shadow"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 border-t bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-md"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            name="comment"
            className="flex-1 px-4 py-1 sm:py-1.5 border border-purple-600 rounded-full bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          />
          <button
            type="submit"
            className="flex items-center justify-center size-8 sm:size-9 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full hover:scale-105 shadow-lg transition"
          >
            <FiSend className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Task;
