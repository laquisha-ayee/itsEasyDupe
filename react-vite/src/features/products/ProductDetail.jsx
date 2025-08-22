import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/products";
import { fetchReviews } from "../../redux/reviews";
import { createCartItem } from "../../redux/cartItems";
import { createFavorite, deleteFavoriteThunk } from "../../redux/favorites";
import ReviewForm from "../reviews/ReviewForm";
import ReviewList from "../reviews/ReviewList";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const product = useSelector((state) => 
    state.products.allProducts.find(p => p.id === Number(id))
  );
  const user = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => Object.values(state.cart));
  const reviews = useSelector((state) => Object.values(state.reviews));
  const favorites = useSelector((state) => Object.values(state.favorites));

  // Calculate if product is in cart or favorites
  const isInCart = cartItems.some(item => item.product_id === product?.id);
  const isInFavorites = favorites.some(fav => fav.product_id === product?.id);

  // Check if user has already reviewed this product
  const userHasReviewed = user && reviews.some(review => 
    review.product_id === product?.id && review.user_id === user.id
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews());
  }, [dispatch]);

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

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-image-section">
          <img 
            src={product.image_url} 
            alt={product.title}
            className="product-detail-image"
          />
        </div>
        
        <div className="product-info-section">
          <div className="title-favorite-container">
            <h1>{product.title}</h1>
            {user && (
              <button 
                onClick={handleToggleFavorite} 
                className={`favorite-heart ${isInFavorites ? 'favorited' : ''}`}
              >
                ♥
              </button>
            )}
          </div>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <p className="product-category">Category: {product.category}</p>
          
          <div className="product-action-buttons">
            <button 
              onClick={() => navigate("/products")} 
              className="back-to-products-btn"
            >
              ← Back to Products
            </button>
            {user && (
              <button 
                onClick={handleAddToCart} 
                className="add-to-cart-btn"
                disabled={isInCart}
              >
                {isInCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <ReviewList productId={product.id} />
        {user && !userHasReviewed && <ReviewForm productId={product.id} />}
      </div>
    </div>
  );
}