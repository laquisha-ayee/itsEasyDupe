from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review  
from datetime import datetime

reviews_routes = Blueprint('reviews', __name__, url_prefix='/reviews')


#create
@reviews_routes.route('/', methods=['POST'], strict_slashes=False)
@login_required
def create_review():
    data = request.get_json()
    product_id = data.get('product_id')
    rating = data.get('rating')
    comment = data.get('comment')

    existing_review = Review.query.filter_by(
        product_id=product_id,
        user_id=current_user.id
    ).first()

    if existing_review:
        return jsonify({'error': 'User has already reviewed this product'}), 400

    new_review = Review(
        product_id=product_id,
        user_id=current_user.id,
        rating=rating,
        comment=comment
    )
    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict()), 201

#read
@reviews_routes.route('/', methods=['GET'], strict_slashes=False)
def get_all_reviews():
    """
    GET /reviews/
    Returns a list of all reviews.
    """
    reviews = Review.query.all()
    return jsonify([r.to_dict() for r in reviews])


#read1
@reviews_routes.route('/<int:id>', methods=['GET'], strict_slashes=False)
def get_review(id):
    """
    GET /reviews/<id>
    Returns a single review by its ID.
    """
    review = Review.query.get_or_404(id)
    return jsonify(review.to_dict())

#update
@reviews_routes.route('/<int:id>', methods=['PUT'], strict_slashes=False)
def update_review(id):
    """
    PUT /reviews/<id>
    Updates fields on an existing review.
    Expects JSON with any of: "rating", "comment".
    """
    review = Review.query.get_or_404(id)
    data = request.get_json()

    if 'rating' in data:
        review.rating = data['rating']
    if 'comment' in data:
        review.comment = data['comment']

    db.session.commit()
    return jsonify(review.to_dict())

#delete
@reviews_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_review(id):
    """
    DELETE /reviews/<id>
    Deletes a review.
    """
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted'}), 200