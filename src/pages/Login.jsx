import { Form, Link, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useResetPassword } from "../hooks/useResetPassword";
import { formError } from "../components/ErrorId";
import { useGoogle } from "../hooks/useGoogle";
import { useGithub } from "../hooks/useGithub";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { _login, error: _error, isPending } = useLogin();
  const { resetPassword } = useResetPassword();
  const [forgetPassword, setForgetPassword] = useState(false);
  const [emailRecovery, setEmailRecovery] = useState("");
  const { googleProvider, isPending: isPendingGoogle } = useGoogle();

  const { githubProvider, isPending: isPendingGithub } = useGithub();

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }

    if (user?.emailRecovery) {
      resetPassword(user.emailRecovery);
      setError(false);
      setEmailRecovery("");
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
            {!forgetPassword && (
              <>
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <Form method="post" className="flex flex-col gap-4 mt-4">
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
                      Login
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
                  <div className="mt-3 flex flex-col gap-3">
                    <p className="text-center text-gray-500 text-sm font-medium">
                      Or sign in with
                    </p>

                    {!isPendingGoogle ? (
                      <button
                        type="button"
                        onClick={googleProvider}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        <FcGoogle className="w-7 h-7" />
                        <span className="font-medium">
                          Continue with Google
                        </span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-400 bg-gray-50 cursor-not-allowed"
                      >
                        Loading...
                      </button>
                    )}

                    {!isPendingGithub ? (
                      <button
                        type="button"
                        onClick={githubProvider}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        <FaGithub className="w-6 h-6" />
                        <span className="font-medium">
                          Continue with GitHub
                        </span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-400 bg-gray-50 cursor-not-allowed"
                      >
                        Loading...
                      </button>
                    )}
                  </div>
                </Form>
              </>
            )}

            {forgetPassword && (
              <>
                <h1 className="text-2xl font-bold text-center">
                  Reset Password
                </h1>
                <Form method="post" className="flex flex-col gap-4 mt-4">
                  <input
                    type="email"
                    name="emailRecovery"
                    placeholder="Reset password email"
                    value={emailRecovery}
                    onChange={(e) => setEmailRecovery(e.target.value)}
                    className="input input-border focus:outline-none focus:border-blue-500 shadow-blue-500 focus:shadow-lg focus:shadow-blue-400/50 rounded w-full h-9.5"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 rounded-lg text-lg transition h-9.5"
                  >
                    Send
                  </button>
                </Form>
              </>
            )}

            {!forgetPassword && (
              <button
                onClick={() => setForgetPassword(!forgetPassword)}
                className="mt-2 text-sm text-blue-800 hover:underline self-end"
              >
                Forget Password?
              </button>
            )}

            {forgetPassword && (
              <button
                onClick={() => setForgetPassword(!forgetPassword)}
                className="w-full text-center text-blue-600 hover:text-blue-700 hover:underline text-sm mt-3 transition"
              >
                Show login
              </button>
            )}

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

            {!forgetPassword && (
              <p className="text-center mt-1">
                Don’t have an account?{" "}
                <Link to="/register" className="link link-primary font-medium">
                  Register
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
