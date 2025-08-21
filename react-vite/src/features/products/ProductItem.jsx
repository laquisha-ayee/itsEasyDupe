import { useState, useEffect } from 'react';
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
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if item is already in cart
  useEffect(() => {
    const isInCart = cartItems.some(item => item.product_id === product.id);
    setAddedToCart(isInCart);
  }, [cartItems, product.id]);

  // Check if item is already favorited
  useEffect(() => {
    const isInFavorites = favorites.some(fav => fav.product_id === product.id);
    setIsFavorited(isInFavorites);
  }, [favorites, product.id]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id));
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(createCartItem(product.id, 1));
      setAddedToCart(true);
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorited) {
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
            className={`favorite-heart ${isFavorited ? 'favorited' : ''}`}
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
          disabled={addedToCart}
        >
          {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
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