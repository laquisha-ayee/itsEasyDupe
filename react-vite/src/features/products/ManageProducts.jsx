import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProductThunk } from "../../redux/products";
import { useNavigate } from "react-router-dom";
import "./ManageProducts.css";

export default function ManageProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allProducts = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.session.user);

  const isLoading = allProducts == null;
  const products = allProducts ?? [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id));
    }
  };

  const userProducts = user
    ? products.filter((p) => p.seller_id === user.id)
    : [];

  if (!user) {
    return (
      <div className="manage-products-container">
        <h2>Manage Products</h2>
        <p>Please log in to manage your products.</p>
      </div>
    );
  }

  return (
    <div className="manage-products-container">
      <div className="manage-products-header">
        <h2>Manage Products</h2>
        <button onClick={() => navigate("/products/new")}>
          Add New Product
        </button>
      </div>

      {isLoading ? (
        <p>Loading products...</p>
      ) : userProducts.length === 0 ? (
        <p>You have no products.</p>
      ) : (
        <div className="manage-products-list">
          {userProducts.map((product) => {
            
            return (
              <div key={product.id} className="manage-product-card">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="manage-product-image"
                />
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <div className="manage-product-actions">
                  <button onClick={() => navigate(`/products/${product.id}/edit`)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}