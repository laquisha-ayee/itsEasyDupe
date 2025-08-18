from .auth_routes import auth_routes
from .user_routes import user_routes
from .products_routes import products_routes
from .favorites_routes import favorites_routes
from .cart_items_routes import cart_items_routes
from .reviews_routes import reviews_routes

def register_blueprints(app):
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(products_routes, url_prefix='/api/products')
    app.register_blueprint(favorites_routes, url_prefix='/api/favorites')
    app.register_blueprint(cart_items_routes, url_prefix='/api/cart_items')
    app.register_blueprint(reviews_routes, url_prefix='/api/reviews')