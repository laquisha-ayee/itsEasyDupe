// frontend/features/products/ProductItem.jsx

import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
  return (
    <div className="product-item">
      <h3>{product.title}</h3>
      <img
        src={product.image_url}
        alt={product.title || "Product image"}
        style={{ maxWidth: "300px", height: "auto" }}
      />
      <p>{product.description}</p>
      <p>${product.price}</p>


      <Link to={`/products/${product.id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}