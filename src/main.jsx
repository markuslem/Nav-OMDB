import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Instructions from './pages/Instructions.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/analyze',
    element: <ResultsPage />
  },
  {
    path: '/instructions',
    element: <Instructions />,
    errorElement: <NotFoundPage />

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
