import { Form, Link, useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();

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
                <button className="btn btn-primary w-full text-[17px]">
                  Register
                </button>
              )}
              {isPending && (
                <button disabled className="btn btn-disabled w-full">
                  Loading...
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
