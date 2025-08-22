import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/products";
import { fetchFavorites } from "../../redux/favorites";
import ProductItem from "./ProductItem";
import "./ProductList.css";

export default function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showManageMenu, setShowManageMenu] = useState(false);

  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchProducts());
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, user]);

  const toggleManageMenu = () => {
    setShowManageMenu(!showManageMenu);
  };

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <div className="products-header">
        <div className="title-section">
          <h1 className="website-title">It&apos;s Easy</h1>
          <p className="website-description">
            Your one stop place to buy and sell 
            products made by hand, with love.
          </p>
        </div>
        <div className="header-action-buttons">
          {user && (
            <div className="manage-dropdown">
              <button onClick={toggleManageMenu}>
                 Manage Stuff ↓
              </button>
              {showManageMenu && (
                <div className="manage-menu">
                  <button onClick={() => navigate("/products/manage")}>
                    Products
                  </button>
                  <button onClick={() => navigate("/favorites")}>
                    Favorites
                  </button>
                  <button onClick={() => navigate("/cart")}>
                    Cart
                  </button>
                  <button onClick={() => navigate("/reviews/manage")}>
                    Reviews
                  </button>
                </div>
              )}
            </div>
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