import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProductThunk } from "../../redux/products";
import { useNavigate } from "react-router-dom";
import "./ManageProducts.css"; 

export default function ManageProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id));
    }
  };

  const userProducts = products
    ? products.filter((product) => product.seller_id === user.id)
    : [];

  if (!products) return <p>Loading products...</p>;
  if (userProducts.length === 0) return <p>You have no products.</p>;

  return (
    <div className="manage-products-container">
      <h1>Manage Products</h1>
      <div className="manage-products-list">
        {userProducts.map((product) => (
          <div key={product.id} className="manage-product-card">
            <img
              src={product.image_url}
              alt={product.title}
              className="manage-product-image"
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
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
        ))}
      </div>
    </div>
  );
}