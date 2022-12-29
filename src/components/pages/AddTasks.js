import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { imageupload } from '../../api/imageupload';
import { addTask } from '../../api/tasks';
import { AuthenticationContext } from '../../context/Authentication';
import SmallSpinner from '../Loading/SmallSpinner';

const AddTasks = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthenticationContext);
  // add your daily task form
  const handlesubmit = (e) => {
    e.preventDefault();

    const image = e.target.image.files[0];
    const message = e.target.message.value;

    setLoading(true);
    imageupload(image)
      .then((res) => {
        const tasksdata = {
          date: format(new Date(), 'PPP'),
          email: user?.email,
          image: res.data.display_url,
          message,
          user: user?.displayName,
        };
        addTask(tasksdata)
          .then((data) => {
            console.log('🚀 ~ file: AddTasks.js:27 ~ .then ~ data', data);
            toast.success('🚀 Task Added 🚀');
            setLoading(false);
            e.target.reset();
          })
          .catch((error) => {
            console.error('🚀 ~ file: AddTasks.js:32 ~ .then ~ error', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log('🚀 ~ file: AddTasks.js:38 ~ handlesubmit ~ error', error);
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handlesubmit} className="w-full max-w-md">
          <h1 className="font-bold text-2xl">Add Your Daily Task</h1>
          <div className="relative flex items-center mt-8">
            <textarea
              name="message"
              required
              placeholder="Write down your daily task!"
              className="block w-full h-32 px-3 py-3 mx-auto mt-6 bg-white border-2 rounded-lg dark:border-gray-600 dark:bg-gray-900"
            ></textarea>
          </div>
          <label htmlFor="image" className="flex items-center">
            <input
              type="file"
              id="image"
              name="image"
              required
              className="px-3 py-3 mx-auto mt-6 bg-white border-2 border-dashed rounded-lg cursor-pointer w-full dark:border-gray-600 dark:bg-gray-900"
            />
          </label>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {loading ? <SmallSpinner /> : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTasks;
