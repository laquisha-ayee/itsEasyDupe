import { useState, useEffect } from "react";
import './ProductForm.css';


export default function ProductForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

useEffect(() => {
  if (initialData) {
    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      price: initialData.price || "",
      imageUrl: initialData.imageUrl || "",
    });
  }
}, [initialData]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", description: "", price: "", imageUrl: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{initialData.id ? "Edit Product" : "Add New Product"}</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter product title"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter product description"
      />

      <label htmlFor="price">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Enter price"
        required
      />

      <label htmlFor="imageUrl">Image URL</label>
      <input
        id="imageUrl"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Enter image URL"
      />

      <button type="submit">
        {initialData.id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}