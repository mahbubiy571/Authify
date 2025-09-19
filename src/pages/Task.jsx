import { useParams, Link } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import { formatTimestampToTime } from "../utils/index";

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
      createdAt: new Date(),
    };

    const commentRef = doc(db, "tasks", data.id);
    await updateDoc(commentRef, {
      comments: [...(data.comments || []), newComment],
    });
    e.target.reset();
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-bold text-indigo-600 animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md sticky top-0 z-50">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-white/30 transition"
          >
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
            Task: {data.title}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-300">
          {data.comments.length === 0 ? (
            <p className="text-gray-200 italic text-center mt-10">
              No comments yet. Be the first! 💬
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
                    <Link to={`/userinfo/${user.uid}`}>
                      <img
                        src={comment.photoURL}
                        alt={comment.displayName}
                        className="w-10 h-10 rounded-full shadow-lg border-2 border-purple-400"
                      />
                    </Link>
                  )}

                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl shadow-lg text-sm transition-all duration-300 ${
                      isMine
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-br-none hover:scale-105"
                        : "bg-white text-gray-800 rounded-bl-none hover:scale-105"
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <p className="break-words">{comment.text}</p>
                      <span
                        className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full ${
                          isMine
                            ? "bg-white/20 text-white/80"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {formatTimestampToTime(comment.createdAt)}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] block mt-1 ${
                        isMine ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {comment.displayName}
                    </span>
                  </div>

                  {isMine && (
                    <Link to={`/userinfo/${user.uid}`}>
                      <img
                        src={comment.photoURL}
                        alt={comment.displayName}
                        className="w-10 h-10 rounded-full shadow-lg border-2 border-indigo-400"
                      />
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 p-4 border-t bg-white/30 backdrop-blur-md"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            name="comment"
            className="flex-1 px-4 py-1 sm:py-2 border border-purple-500 rounded-full bg-white/90 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400/60 transition"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow-xl hover:scale-110 transition-transform"
          >
            <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Task;
