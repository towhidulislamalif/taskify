import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../../context/Authentication';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signout } = useContext(AuthenticationContext);

  const handlesignout = () => {
    signout()
      .then()
      .catch((error) => console.error(error));
  };
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="text-2xl font-bold text-blue-600 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-blue-500 dark:hover:text-gray-300"
              to="/"
            >
              Taskify
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={
            isOpen
              ? 'translate-x-0 opacity-100 absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center'
              : 'opacity-0 -translate-x-full absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center'
          }
        >
          {user?.uid && (
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/"
              >
                Add Tasks
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/my-tasks"
              >
                My Tasks
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/completed-tasks"
              >
                Completed Tasks
              </Link>
            </div>
          )}

          <div className="flex justify-center md:block gap-4">
            {user?.uid ? (
              <button
                onClick={handlesignout}
                className="px-4 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-rose-600 rounded hover:bg-rose-500 focus:outline-none focus:ring focus:ring-rose-300 focus:ring-opacity-80"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link to="/sign-in">
                  <button className="px-4 py-2 mr-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Sign in
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="px-4 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded hover:bg-teal-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
