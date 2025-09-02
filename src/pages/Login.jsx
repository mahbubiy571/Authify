import { Form, Link, useActionData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useResetPassword } from "../hooks/useResetPassword";
import { formError } from "../components/ErrorId";

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
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-90 max-w-md bg-base-100 shadow-xl mx-5">
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
                  <button className="btn btn-primary w-full text-[17px]">
                    Login
                  </button>
                )}
                {isPending && (
                  <button disabled className="btn btn-disabled w-full">
                    Loading...
                  </button>
                )}
              </Form>
            </>
          )}

          {forgetPassword && (
            <>
              <h1 className="text-2xl font-bold text-center">Reset Password</h1>
              <Form method="post" className="flex flex-col gap-4 mt-4">
                <input
                  type="email"
                  name="emailRecovery"
                  placeholder="Reset password email"
                  className="input input-border focus:outline-none focus:border-blue-500 shadow-blue-500 focus:shadow-lg focus:shadow-blue-400/50 rounded w-full h-9.5"
                  required
                />

                <button className="btn btn-primary w-full text-[17px]">
                  Send
                </button>
              </Form>
            </>
          )}

          {!forgetPassword && (
            <button
              onClick={() => setForgetPassword(!forgetPassword)}
              className="mt-2 text-sm text-blue-600 hover:underline self-end"
            >
              Forget Password?
            </button>
          )}

          {forgetPassword && (
            <button
              onClick={() => setForgetPassword(!forgetPassword)}
              className="text-blue-600 hover:underline text-sm mt-2"
            >
              Show login
            </button>
          )}

          {error && (
            <div className="text-red-600 text-center mt-3 text-sm">{error}</div>
          )}

          {_error && (
            <div className="text-red-600 text-center mt-3 text-sm">
              {_error}
            </div>
          )}

          {!forgetPassword && (
            <p className="text-center mt-1">
              Don’t have an account?{" "}
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
