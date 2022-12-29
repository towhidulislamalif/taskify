import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { AuthenticationContext } from '../../context/Authentication';

const Signin = () => {
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const { login, googleSignin } = useContext(AuthenticationContext);

  // signin form
  const formsubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // signin users
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('🚀 ~ file: Signin.js:25 ~ .then ~ user', user);
        // navigate
        navigate(from, { replace: true });
        // form reset
        e.target.reset();
      })
      .catch((error) => {
        const errorMsg = error.message;
        setError(errorMsg);
      });
  };

  // signin with google
  const signinWithGoogle = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        console.log('🚀 ~ file: Signin.js:42 ~ .then ~ user', user);
        // navigate
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMsg = error.message;
        setError(errorMsg);
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={formsubmit} className="w-full max-w-md">
          <h1 className="capitalize text-3xl font-semibold text-gray-800 dark:text-white">
            Sign In
          </h1>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <HiOutlineMail className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
            </span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <HiOutlineLockClosed className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
            </span>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* error message */}
          {error && (
            <p className="mt-4 text-red-600 dark:text-gray-400">{error}</p>
          )}
          {/* signin button */}
          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign in
            </button>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              Or sign in with
            </p>
            <button
              onClick={signinWithGoogle}
              className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg w-full dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <FcGoogle className="w-6 h-6 mx-2" />
              <span className="mx-2">Sign in with Google</span>
            </button>

            <div className="mt-6 text-center ">
              <Link
                to="/sign-up"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Don’t have an account yet? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signin;
