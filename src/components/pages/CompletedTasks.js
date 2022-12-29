import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { AuthenticationContext } from '../../context/Authentication';
import Loading from '../Loading/Loading';

const CompletedTasks = () => {
  const [addComment, setAddComment] = useState('');
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
        // console.log(
        //   '🚀 ~ file: CompletedTasks.js:26 ~ queryFn: ~ error',
        //   error
        // );
      }
    },
  });
  // console.log("🚀 ~ file: CompletedTasks.js:37 ~ CompletedTasks ~ myTasks", myTasks)
  console.log(
    '🚀 ~ file: CompletedTasks.js:33 ~ CompletedTasks ~ myTasks',
    myTasks
  );

  // handle comment
  const handlecomment = (id) => {
    const comment = {
      addComment,
    };
    fetch(`https://tasks-server-navy.vercel.app/tasks/comment/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('🚀 Comment Added 🚀');
          refetch();
        }
      });
  };

  // not completed
  const handlenotcomplete = (id) => {
    fetch(`https://tasks-server-navy.vercel.app/tasks/notcompleted/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('🚀 Completed Task Remove 🚀');
          refetch();
        }
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
            Your Completed Tasks
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {myTasks.map((task) => {
            const { completed, comment, date, image, message, _id } = task;
            return (
              <>
                {completed && (
                  <article key={_id} className="flex flex-col bg-gray-50">
                    <div>
                      <img
                        alt=""
                        className="object-cover w-full h-52 bg-gray-500"
                        src={image}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <span className="text-xs tracking-wider uppercase text-blue-600">
                        {date}
                      </span>
                      <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                        {message}
                      </h3>
                      <div className="flex flex-wrap justify-between pt-2 space-x-2 text-xs text-gray-600">
                        <button
                          onClick={() => handleremove(_id)}
                          type="button"
                          className="font-bold flex items-center px-2 py-1 pl-0 space-x-1 text-red-600"
                        >
                          <MdDelete className="w-4 h-4 fill-current" />
                          <span>Remove</span>
                        </button>
                        <button
                          onClick={() => handlenotcomplete(_id)}
                          type="button"
                          className="font-bold flex items-center px-2 py-1 space-x-1 text-rose-600"
                        >
                          <FaHeart className="w-4 h-4 fill-current" />
                          <span>Not Completed</span>
                        </button>
                      </div>
                      {/* comment */}
                      <div className="flex flex-col gap-2">
                        <textarea
                          name="comment"
                          onChange={(e) => setAddComment(e.target.value)}
                          defaultValue={comment?.addComment}
                          required
                          placeholder="Add Comment!"
                          className="block h-12 w-full px-2 py-2 mx-auto mt-4 bg-white border-2 rounded-lg dark:border-gray-600 dark:bg-gray-900"
                        ></textarea>
                        <button
                          onClick={() => handlecomment(_id)}
                          className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        >
                          Comment
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

export default CompletedTasks;
