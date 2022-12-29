import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Error from '../components/Error/Error';
import { AddTasks, CompletedTasks, Mytasks } from '../components/pages';
import { Signin, Signup } from '../components/form';
import Protected from './Protected';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <Protected>
            <AddTasks />
          </Protected>
        ),
      },
      {
        path: '/completed-tasks',
        element: (
          <Protected>
            <CompletedTasks />
          </Protected>
        ),
      },
      {
        path: '/my-tasks',
        element: (
          <Protected>
            <Mytasks />
          </Protected>
        ),
      },
      {
        path: '/sign-in',
        element: <Signin />,
      },
      {
        path: '/sign-up',
        element: <Signup />,
      },
    ],
  },
]);

export default router;
