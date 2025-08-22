import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../redux/reviews";
import ReviewItem from "./ReviewItem";
import "./ReviewList.css";

export default function ReviewList({ productId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // Filter reviews for this specific product
  const productReviews = reviews.filter(review => review.product_id === productId);

  if (productReviews.length === 0) {
    return (
      <div className="reviews-container">
        <h3>Reviews</h3>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <h3>Reviews ({productReviews.length})</h3>
      <div className="reviews-list">
        {productReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}