// add tasks to the database
export const addTask = async (tasksdata) => {
  const response = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(tasksdata),
  });
  const data = await response.json();
  return data;
};
