import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewThunk, deleteReviewThunk } from "../../redux/reviews";
import "./ReviewItem.css";

export default function ReviewItem({ review }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [errors, setErrors] = useState({});

  const isOwner = user && user.id === review.user_id;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await dispatch(updateReviewThunk(review.id, rating, comment));
      setIsEditing(false);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await dispatch(deleteReviewThunk(review.id));
      } catch (error) {
        alert("Failed to delete review");
      }
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (isEditing) {
    return (
      <div className="review-item editing">
        <form onSubmit={handleUpdate}>
          <div className="rating-container">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            required
          />

          {errors.submit && <p className="error">{errors.submit}</p>}

          <div className="edit-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="review-item">
      <div className="review-header">
        <div className="reviewer-info">
          <h4 className="reviewer-name">{review.user?.username || 'Anonymous'}</h4>
          <div className="review-rating">
            <span className="stars">{renderStars(review.rating)}</span>
            <span className="rating-number">({review.rating}/5)</span>
          </div>
        </div>
        <div className="review-date">
          {new Date(review.created_at).toLocaleDateString()}
        </div>
      </div>
      
      <p className="review-comment">{review.comment}</p>
      
      {isOwner && (
        <div className="review-actions">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
}