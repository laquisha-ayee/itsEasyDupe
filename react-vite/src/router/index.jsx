import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductsList from '../features/products/ProductsList';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
      path: "/",
      element: <ProductsList />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
       { 
        path: "products", 
        element: <ProductsList /> 
      },
    ],
  },
]);