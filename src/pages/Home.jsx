import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-100 max-w-lg bg-base-100 shadow-xl">
        <div className="card-body flex flex-col gap-4 text-center">
          <h1 className="text-3xl font-bold">
            Welcome,{" "}
            <span className="text-primary">{user?.displayName || "User"}</span>
          </h1>

          {error && <div className="alert alert-error text-sm">{error}</div>}

          {!isPending && (
            <button
              onClick={_logout}
              className="btn btn-secondary w-40 flex ml-auto mr-auto text-[16px] h-9.5"
            >
              Logout
            </button>
          )}

          {isPending && (
            <button
              disabled
              className="btn btn-disabled w-40 flex ml-auto mr-auto text-[16px] h-9.5"
            >
              Loading...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
