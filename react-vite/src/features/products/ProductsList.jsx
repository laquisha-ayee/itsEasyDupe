import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/products";
import ProductItem from "./ProductItem";

export default function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="products-list">
        <h2>All Products</h2>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}