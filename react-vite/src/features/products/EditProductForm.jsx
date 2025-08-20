// src/features/products/EditProductForm.jsx
import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, updateProduct } from "../../redux/products";
import ProductForm from "./ProductForm";

export default function EditProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  const productFromStore = useSelector((state) =>
    state.products.allProducts.find((p) => p.id === Number(id))
  );

  const [initialData, setInitialData] = useState(productFromStore || null);

  useEffect(() => {
    if (!productFromStore) {
      dispatch(fetchProducts());
    } else {
      setInitialData(productFromStore);
    }
  }, [productFromStore, dispatch]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!initialData) {
    return <p>Loading product...</p>;
  }

  const handleUpdate = async (updatedData) => {
    const payload = {
      title: updatedData.title,
      description: updatedData.description,
      price: updatedData.price,
      image_url: updatedData.imageUrl 
    };

    await dispatch(updateProduct({ productId: id, updatedData: payload }));
    navigate("/products");
  };

  return (
    <ProductForm
      initialData={initialData}
      onSubmit={handleUpdate}
    />
  );
}