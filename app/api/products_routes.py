from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product, CartItem, Favorite, Review

products_routes = Blueprint('products', __name__, url_prefix='/products')

#read
@products_routes.route('/', methods=['GET'], strict_slashes=False)
def get_products():
    """GET /products/ - Return all products"""
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

#read1
@products_routes.route('/<int:id>', methods=['GET'], strict_slashes=False)
def get_product(id):
    """GET /products/<id> - Return product by ID"""
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict()), 200

#create
@products_routes.route('/', methods=['POST'], strict_slashes=False)
@login_required
def create_product():
    """POST /products/ - Create new product"""
    data = request.get_json()

    new_product = Product(
        title=data['title'],
        description=data['description'],
        price=data['price'],
        image_url=data['image_url'],
        category=data['category'],
        seller_id=current_user.id
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201

#update
@products_routes.route('/<int:id>', methods=['PUT'], strict_slashes=False)
@login_required
def update_product(id):
    """PUT /products/<id> - Update existing product"""
    product = Product.query.get_or_404(id)

    if product.seller_id != current_user.id:
        return jsonify({"error": "Not authorized to update this product"}), 403

    data = request.get_json()
    product.title = data.get('title', product.title)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.image_url = data.get('image_url', product.image_url)
    product.category = data.get('category', product.category)

    db.session.commit()
    return jsonify(product.to_dict()), 200

#delete
@products_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_product(id):
    try:
        product = Product.query.get_or_404(id)

        if product.seller_id != current_user.id:
            return jsonify({"error": "Not authorized to delete this product"}), 403

            
        CartItem.query.filter_by(product_id=id).delete()
        Favorite.query.filter_by(product_id=id).delete()
        Review.query.filter_by(product_id=id).delete()

        db.session.delete(product)
        db.session.commit()

        return jsonify({'message': f'Product {id} deleted'}), 200

    except Exception as e:
        print(f"Error deleting product {id}: {e}")
        return jsonify({"error": "Internal server error"}), 500