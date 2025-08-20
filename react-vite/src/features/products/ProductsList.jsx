import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/products";
import ProductItem from "./ProductItem";
import "./ProductList.css";

export default function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <div className="products-header">
        <h2>All Products</h2>
        <button onClick={() => navigate("/cart")}>View Cart</button>
      </div>
      
      {user && (
        <div className="add-product-btn">
          <button onClick={() => navigate("/products/new")}>
            Add New Product
          </button>
        </div>
      )}


      <div className="products-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}