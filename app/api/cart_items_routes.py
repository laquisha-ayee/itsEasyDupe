from flask import Blueprint, request, jsonify
from app.models import db, CartItem

cart_items_routes = Blueprint('cart_items', __name__)

#read
@cart_items_routes.route('/', methods=['GET'], strict_slashes=False)
def get_cart_items():
    """Return all cart items as a list of dicts"""
    items = CartItem.query.all()
    return jsonify([item.to_dict() for item in items])

#read1
@cart_items_routes.route('/<int:id>', methods=['GET'])
def get_cart_item(id):
    """Return a single cart item by ID"""
    item = CartItem.query.get(id)
    if not item:
        return {'error': 'Cart item not found'}, 404
    return item.to_dict()

#create
@cart_items_routes.route('/', methods=['POST'])
def create_cart_item():
    """Create a new cart item"""
    data = request.get_json()
    new_item = CartItem(
        product_id=data['product_id'],
        user_id=data['user_id'],
        quantity=data.get('quantity', 1)
    )
    db.session.add(new_item)
    db.session.commit()
    return new_item.to_dict(), 201

#uodate
@cart_items_routes.route('/<int:id>', methods=['PUT'])
def update_cart_item(id):
    """Update an existing cart item"""
    item = CartItem.query.get(id)
    if not item:
        return {'error': 'Cart item not found'}, 404

    data = request.get_json()
    if 'quantity' in data:
        item.quantity = data['quantity']
    db.session.commit()
    return item.to_dict()

#delete
@cart_items_routes.route('/<int:id>', methods=['DELETE'])
def delete_cart_item(id):
    """Delete a cart item"""
    item = CartItem.query.get(id)
    if not item:
        return {'error': 'Cart item not found'}, 404

    db.session.delete(item)
    db.session.commit()
    return {'message': 'Cart item deleted'}