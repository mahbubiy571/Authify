import { Form, Link, useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";
import { useGoogle } from "../hooks/useGoogle";
import { useGithub } from "../hooks/useGithub";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();
  const {
    githubProvider,
    isPending: githubLoading,
    error: errorGithub,
  } = useGithub();

  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  return (
    <div
      className="flex items-center justify-center min-h-screen 
      bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="card w-90 max-w-md bg-base-200 shadow-xl mx-5">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">Register</h1>

            <Form method="post" className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-border focus:outline-none focus:border-blue-500 shadow-blue-500 focus:shadow-lg focus:shadow-blue-400/50 rounded w-full h-9.5"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-border focus:outline-none focus:border-blue-500 shadow-blue-500 focus:shadow-lg focus:shadow-blue-400/50 rounded w-full h-9.5"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-border focus:outline-none focus:border-blue-500 shadow-blue-500 focus:shadow-lg focus:shadow-blue-400/50 rounded w-full h-9.5"
                required
              />
              {!isPending && (
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 rounded-lg text-lg transition h-9.5"
                >
                  Register
                </button>
              )}

              {isPending && (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white font-medium py-2 rounded-lg text-lg cursor-not-allowed"
                >
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </button>
              )}

              <p className="text-center text-sm text-gray-500 my-2">
                Or continue with
              </p>

              {!isPendingGoogle && (
                <button
                  type="button"
                  onClick={googleProvider}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Continue with Google</span>
                </button>
              )}

              {isPendingGoogle && (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  <svg
                    className="animate-spin h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </button>
              )}

              {!githubLoading && (
                <button
                  type="button"
                  onClick={githubProvider}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/349375/github.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Continue with GitHub</span>
                </button>
              )}

              {githubLoading && (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  <svg
                    className="animate-spin h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </button>
              )}
            </Form>

            {error && (
              <div className="text-red-600 text-center mt-3 text-sm">
                {error}
              </div>
            )}

            {_error && (
              <div className="text-red-600 text-center mt-3 text-sm">
                {_error}
              </div>
            )}

            {errorGoogle && (
              <div className="text-red-600 text-center mt-3 text-sm">
                {errorGoogle}
              </div>
            )}

            {errorGithub && (
              <div className="text-red-600 text-center mt-3 text-sm">
                {errorGithub}
              </div>
            )}

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
