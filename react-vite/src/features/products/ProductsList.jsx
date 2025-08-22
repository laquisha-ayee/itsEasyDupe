import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/products";
import { fetchFavorites } from "../../redux/favorites"; // Added this import
import ProductItem from "./ProductItem";
import "./ProductList.css";

export default function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchProducts());
    // Added this to fetch favorites when page loads
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, user]); // Added user to dependencies

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <div className="products-header">
        <h1 className="website-title">It&apos;s Easy</h1>
        <div className="header-action-buttons">
          {user && (
            <button onClick={() => navigate("/products/manage")}> Manage Products</button>
          )}
          {user && (
            <button onClick={() => navigate("/favorites")}>Manage Favorites</button>
          )}
          {user && (
            <button onClick={() => navigate("/cart")}>View Cart</button>
          )}
        </div>
      </div>

      <div className="products-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}