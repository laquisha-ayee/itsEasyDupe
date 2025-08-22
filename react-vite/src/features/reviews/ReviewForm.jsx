import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../redux/reviews";
import "./ReviewForm.css";

export default function ReviewForm({ productId, onReviewSubmitted }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await dispatch(createReviewThunk(productId, rating, comment));
      setComment("");
      setRating(5);
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit} className="review-form">
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

        <div className="comment-container">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows="4"
            required
          />
        </div>

        {errors.submit && <p className="error">{errors.submit}</p>}

        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
}