import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductThunk } from '../../redux/products';
import { createCartItem } from '../../redux/cartItems';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id));
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(createCartItem(product.id, 1));
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="product-item">
      <h3>{product.title}</h3>
      <img
        src={product.image_url}
        alt={product.title || "Product image"}
      />
      <p>{product.description}</p>
      <p>${product.price}</p>

      {user && (
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      )}

      <div className="product-actions">
        <Link to={`/products/${product.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => handleDelete(product.id)}>Delete</button>
      </div>
    </div>
  );
}