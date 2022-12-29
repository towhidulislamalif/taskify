// add tasks to the database
export const addTask = async (tasksdata) => {
  const response = await fetch('https://tasks-server-navy.vercel.app/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(tasksdata),
  });
  const data = await response.json();
  return data;
};
