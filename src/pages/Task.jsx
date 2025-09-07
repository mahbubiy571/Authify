import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get("comment");

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
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Task-{data.title}</h1>
      <div>
        {data.comments.length == 0 ? (
          "No Comments"
        ) : (
          <div>
            {data.comments.map((comment) => (
              <div key={comment.id}>
                <img src={comment.photoURL} alt={comment.displayName} />
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="add comment" name="comment" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default Task;
