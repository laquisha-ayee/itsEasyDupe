const LOAD_REVIEWS = 'reviews/loadReviews';
const CREATE_REVIEW = 'reviews/createReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';


export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
});




export const fetchReviews = () => async (dispatch) => {
  const response = await fetch('/api/reviews/');
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
    return reviews;
  }
};

export const createReviewThunk = (productId, rating, comment) => async (dispatch) => {
  const response = await fetch('/api/reviews/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      rating,
      comment
    }),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(createReview(review));
    return review;
  } else {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create review');
  }
};

export const updateReviewThunk = (reviewId, rating, comment) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rating,
      comment
    }),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(updateReview(review));
    return review;
  } else {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update review');
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
    return { message: 'Review deleted successfully' };
  } else {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete review');
  }
};



const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const reviewsState = {};
      action.reviews.forEach((review) => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
    }
    
    case CREATE_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review
      };
    
    case UPDATE_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review
      };
    
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    
    default:
      return state;
  }
};

export default reviewsReducer;

