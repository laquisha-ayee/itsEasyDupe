import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchFavorites, deleteFavoriteThunk } from '../../redux/favorites';
import { fetchProducts } from '../../redux/products';
import './FavoritesList.css';

export default function FavoritesList() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => Object.values(state.favorites));
  const products = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Your Favorites</h2>
        <p>You haven&apos;t added any favorites yet.</p>
      </div>
    );
  }

  const handleRemoveFavorite = (favoriteId) => {
    if (window.confirm("Remove this item from favorites?")) {
      dispatch(deleteFavoriteThunk(favoriteId));
    }
  };

  const handleEmptyFavorites = () => {
    if (window.confirm("Remove all favorites?")) {
      favorites.forEach(favorite => {
        dispatch(deleteFavoriteThunk(favorite.id));
      });
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Your Favorites</h2>
        {favorites.length > 0 && (
          <button onClick={handleEmptyFavorites} className="empty-favorites-btn">
            Clear All Favorites
          </button>
        )}
      </div>
      
      <div className="favorites-list">
        {favorites.map(favorite => {
          const product = products.find(p => p.id === favorite.product_id);
          return (
            <div key={favorite.id} className="favorite-item">
              <img 
                src={product?.image_url} 
                alt={product?.title || "Product image"}
                className="favorite-item-image"
              />
              <div className="favorite-item-details">
                <h3>{product?.title}</h3>
                <p className="favorite-item-description">{product?.description}</p>
                <p className="favorite-item-price">${product?.price}</p>
                <button 
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="remove-favorite-btn"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

