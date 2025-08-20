// src/features/products/ProductForm.jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/products";

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      price: initialData.price || "",
      imageUrl: initialData.imageUrl || "",
      category: initialData.category || ""
    });
  }, [
    initialData.title,
    initialData.description,
    initialData.price,
    initialData.imageUrl,
    initialData.category
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If EditProductForm passes a custom onSubmit handler, use that
      if (onSubmit) {
        return onSubmit(formData);
      }

      const method = initialData.id ? "PUT" : "POST";
      const url = initialData.id
        ? `/api/products/${initialData.id}`
        : "/api/products";

      // Normalize to snake_case for the backend
      const payload = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        image_url: formData.imageUrl,
        category: formData.category
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      await dispatch(fetchProducts());
      navigate("/products");
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{initialData.id ? "Edit Product" : "Add New Product"}</h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />

      <input
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />

      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />

      <button type="submit">
        {initialData.id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}