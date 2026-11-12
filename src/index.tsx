// @ts-ignore CSS is loaded via webpack or similar bundler, so TypeScript may not recognize it.
import './styles/index.css';
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

import Home from './pages/Home/Home';
// import Tasks from './pages/Tasks/Tasks';

import { ROUTES } from './constants/routes';
import configureStore from './store/configureStore'; // adjust to your export

const store = configureStore();

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
    //   { path: 'tasks', element: <Tasks /> },
      { path: '*', element: <div>404 – Page not found</div> },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);