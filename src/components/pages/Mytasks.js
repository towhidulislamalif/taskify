import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { AuthenticationContext } from '../../context/Authentication';
import Loading from '../Loading/Loading';

const Mytasks = () => {
  const { user } = useContext(AuthenticationContext);
  // get all tasks by specific user email from the database
  const {
    data: myTasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://tasks-server-navy.vercel.app/tasks/${user?.email}`,
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        // console.error('🚀 ~ file: Mytasks.js:26 ~ queryFn: ~ error', error);
      }
    },
  });
  console.log('🚀 ~ file: Mytasks.js:29 ~ Mytasks ~ myTasks', myTasks);
  // update tasks to the database
  const handlecomplete = (id) => {
    fetch(`https://tasks-server-navy.vercel.app/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('🚀 Task Completed 🚀');
          refetch();
        }
      })
      .catch((error) => {
        // console.error(
        //   '🚀 ~ file: Mytasks.js:46 ~ handlecomplete ~ error',
        //   error
        // );
      });
  };
  // delete task to the database
  const handleremove = (id) => {
    fetch(`https://tasks-server-navy.vercel.app/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success('🚀 Task Deleted 🚀');
          refetch();
        }
      });
  };

  // loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen py-6 sm:py-12 bg-gray-100 text-gray-800">
      <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">
            Hello,{' '}
            <span className="capitalize italic underline text-blue-600">
              {user?.displayName}
            </span>{' '}
            Your Daily Tasks
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {myTasks.map((tasks) => {
            const { _id, completed, date, image, message } = tasks;
            return (
              <>
                {!completed && (
                  <article key={_id} className="flex flex-col bg-gray-50">
                    <div>
                      <img
                        alt=""
                        className="object-cover w-full h-52 bg-gray-500"
                        src={image}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs tracking-wider uppercase text-blue-600">
                          {date}
                        </span>
                      </div>
                      <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                        {message}
                      </h3>
                      <div className="flex flex-wrap justify-between pt-2 space-x-2 text-xs text-gray-600">
                        <button
                          onClick={() => handlecomplete(_id)}
                          type="button"
                          className="font-bold flex items-center px-2 py-1 pl-0 space-x-1 text-green-600"
                        >
                          <FaHeart className="w-4 h-4 fill-current" />
                          <span>Completed</span>
                        </button>
                        <button
                          onClick={() => handleremove(_id)}
                          type="button"
                          className="font-bold flex items-center px-2 py-1 space-x-1 text-rose-600"
                        >
                          <MdDelete className="w-4 h-4 fill-current" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </article>
                )}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mytasks;
