import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/products";
import ProductForm from "./ProductForm";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const handleUpdate = (updatedData) => {
    dispatch(updateProduct(product.id, updatedData));
    setEditing(false);
  };


  return (
    <div className="product-item">
      {editing ? (
        <ProductForm initialData={product} onSubmit={handleUpdate} />
      ) : (
        <>
          <h3>{product.title}</h3>
          <img
            src={product.image_url}
            alt={product.title || "Product image"}
            style={{ maxWidth: "300px", height: "auto" }}
          />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}