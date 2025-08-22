import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/products";
import "./ProductForm.css";

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
    <div className="form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>{initialData.id ? "Edit Product" : "Add New Product"}</h2>

        <div className="form-group">
          <label htmlFor="title">Product Name</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
          />
        </div>

<div className="form-group">
  <label htmlFor="price">Price</label>
  <input
    id="price"
    name="price"
    type="number"
    step="0.01"
    min="0"
    value={formData.price}
    onChange={handleChange}
    placeholder="Enter price (e.g., 10.50)"
    required
  />
</div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          
          {formData.imageUrl && (
            <div className="image-preview">
              <img 
                src={formData.imageUrl} 
                alt="Product preview" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <p className="image-error" style={{display: 'none'}}>
                Image failed to load. Please check the URL.
              </p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {initialData.id ? "Update Product" : "Add Product"}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}