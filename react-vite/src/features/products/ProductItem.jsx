import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductThunk } from '../../redux/products';
import { createCartItem } from '../../redux/cartItems';
import { createFavorite, deleteFavoriteThunk } from '../../redux/favorites';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => Object.values(state.cart));
  const favorites = useSelector((state) => Object.values(state.favorites));

  // Calculate these directly in the render (no useEffect needed)
  const isInCart = cartItems.some(item => item.product_id === product.id);
  const isInFavorites = favorites.some(fav => fav.product_id === product.id);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id));
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(createCartItem(product.id, 1));
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isInFavorites) {
        const favorite = favorites.find(fav => fav.product_id === product.id);
        if (favorite) {
          await dispatch(deleteFavoriteThunk(favorite.id));
        }
      } else {
        await dispatch(createFavorite(product.id));
      }
    } catch (error) {
      alert('Failed to update favorite');
    }
  };

  return (
    <div className="product-item">
      <h3>{product.title}</h3>
      <div className="product-image-container">
        <img
          src={product.image_url}
          alt={product.title || "Product image"}
          className="product-image"
        />
        {user && (
          <button 
            onClick={handleToggleFavorite} 
            className={`favorite-heart ${isInFavorites ? 'favorited' : ''}`}
          >
            ♥
          </button>
        )}
      </div>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {user && (
        <button 
          onClick={handleAddToCart} 
          className="add-to-cart-btn"
          disabled={isInCart}
        >
          {isInCart ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      )}

      {user && (
        <div className="product-actions">
          <Link to={`/products/${product.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}