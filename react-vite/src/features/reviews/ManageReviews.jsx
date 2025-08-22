import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews, updateReviewThunk, deleteReviewThunk } from '../../redux/reviews';
import { fetchProducts } from '../../redux/products';
import './ManageReviews.css';

export default function ManageReviews() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const allReviews = useSelector((state) => Object.values(state.reviews));
  const products = useSelector((state) => state.products.allProducts);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ rating: '', comment: '' });

  // Fetch all reviews and products
  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(fetchProducts());
  }, [dispatch]);


  
  const userReviews = user ? allReviews.filter(review => review.user_id === user.id) : [];

  const getProductInfo = (productId) => {
    return products.find(product => product.id === productId);
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await dispatch(deleteReviewThunk(id));
      } catch (error) {
        alert('Failed to delete review');
      }
    }
  };

  
  const handleEdit = (review) => {
    setEditingId(review.id);
    setFormData({ rating: review.rating, comment: review.comment });
  };

 
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ rating: '', comment: '' });
  };


  const handleUpdate = async () => {
    try {
      await dispatch(updateReviewThunk(editingId, formData.rating, formData.comment));
      setEditingId(null);
      setFormData({ rating: '', comment: '' });
    } catch (error) {
      alert('Failed to update review');
    }
  };

 
  if (!user) {
    return (
      <div className="manage-reviews-container">
        <h2>Manage My Reviews</h2>
        <p>Please log in to manage your reviews.</p>
      </div>
    );
  }

  return (
    <div className="manage-reviews-container">
      <div className="manage-reviews-header">
        <h2>Manage My Reviews</h2>
        <p>You have {userReviews.length} review{userReviews.length !== 1 ? 's' : ''}</p>
      </div>

      {userReviews.length === 0 ? (
        <div className="no-reviews">
          <p>You haven&appos;t written any reviews yet.</p>
        </div>
      ) : (
        <div className="reviews-list">
          {userReviews.map(review => {
            const product = getProductInfo(review.product_id);
            return (
              <div key={review.id} className="review-item">
                {editingId === review.id ? (
                  <div className="edit-form">
                    <div className="rating-input">
                      <label>Rating:</label>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star ${star <= formData.rating ? 'filled' : ''}`}
                            onClick={() => setFormData({ ...formData, rating: star })}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="comment-input">
                      <label>Comment:</label>
                      <textarea
                        value={formData.comment}
                        onChange={e => setFormData({ ...formData, comment: e.target.value })}
                        rows="3"
                      />
                    </div>
                    <div className="edit-actions">
                      <button onClick={handleUpdate} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="review-content">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <h4 className="reviewer-name">{user.username}</h4>
                        <div className="review-rating">
                          <span className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                          <span className="rating-number">({review.rating}/5)</span>
                        </div>
                      </div>
                      <div className="review-date">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {product && (
                      <div className="product-info">
                        <img 
                          src={product.image_url} 
                          alt={product.title}
                          className="product-image"
                        />
                        <div className="product-details">
                          <h5 className="product-title">{product.title}</h5>
                          <p className="product-price">${product.price}</p>
                        </div>
                      </div>
                    )}
                    
                    <p className="review-comment">{review.comment}</p>
                    <div className="review-actions">
                      <button onClick={() => handleEdit(review)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(review.id)} className="delete-btn">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}