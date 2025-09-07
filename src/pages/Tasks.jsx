import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

function Tasks() {
  const { data: tasks } = useCollection("tasks");
  return (
    <ul>
      {tasks &&
        tasks.map((task) => {
          return (
            <li key={task.uid}>
              <Link to={`/task/${task.uid}`}>
                <h5>{task.title}</h5>
                <div className="flex gap-3 my-2">
                  {task.attachedUsers.map((user) => {
                    return (
                      <span key={user.uid}>
                        <img
                          src={user.photoURL}
                          className="w-12 h-12 rounded-full"
                          alt={user.displayName}
                        />
                      </span>
                    );
                  })}
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}

export default Tasks;
