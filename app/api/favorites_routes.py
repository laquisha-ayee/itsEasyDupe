from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user  # <-- ADD THIS
from app.models import db, Favorite
from datetime import datetime

favorites_routes = Blueprint('favorites', __name__, url_prefix='/favorites')

#create
@favorites_routes.route('/', methods=['POST'], strict_slashes=False)
@login_required
def create_favorite():
    data = request.get_json()
    product_id = data.get('product_id')

    existing_favorite = Favorite.query.filter_by(
        product_id=product_id,
        user_id=current_user.id
    ).first()

    if existing_favorite:
        return jsonify({'error': 'Item already favorited'}), 400

    new_favorite = Favorite(
        product_id=product_id,
        user_id=current_user.id,      
        created_at=datetime.utcnow()
    )
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify(new_favorite.to_dict()), 201

#read
@favorites_routes.route('/', methods=['GET'], strict_slashes=False)
@login_required
def get_all_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    return jsonify([f.to_dict() for f in favorites])

#read1
@favorites_routes.route('/<int:id>', methods=['GET'], strict_slashes=False)
@login_required
def get_favorite(id):
    favorite = Favorite.query.get_or_404(id)
    return jsonify(favorite.to_dict())

#update
@favorites_routes.route('/<int:id>', methods=['PUT'], strict_slashes=False)
@login_required
def update_favorite(id):
    favorite = Favorite.query.get_or_404(id)
    data = request.get_json()

    if 'product_id' in data:
        favorite.product_id = data['product_id']

    db.session.commit()
    return jsonify(favorite.to_dict())

#delete
@favorites_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_favorite(id):
    favorite = Favorite.query.get_or_404(id)
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite deleted'}), 200

