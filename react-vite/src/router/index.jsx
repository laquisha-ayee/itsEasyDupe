import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductsList from '../features/products/ProductsList';
import EditProductForm from '../features/products/EditProductForm';
import ProductForm from '../features/products/ProductForm';
import CartItems from '../features/cartItems/CartItems';
import FavoritesList from '../features/favorites/FavoritesList';
import ManageProducts from '../features/products/ManageProducts';


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
      {
        path: "products/new", 
        element: <ProductForm initialData={{}} />
      },
      {
        path: "products/:id/edit", 
        element: <EditProductForm />
      },
      {
         path: "cart", 
         element: <CartItems />  
      },
      {
        path: "favorites",
        element: <FavoritesList />
      },
      {
        path:"products/manage",
        element: <ManageProducts />
      },
    ],
  },
]);