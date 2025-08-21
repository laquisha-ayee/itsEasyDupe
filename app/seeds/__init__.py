from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .favorites import seed_favorites, undo_favorites
from .cart_items import seed_cart_items, undo_cart_items
from app.models import User, Product, Review, Favorite, CartItem
from app.models.db import db, environment, SCHEMA


seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_cart_items()
        undo_favorites()
        undo_reviews()
        undo_products()
        undo_users()

    seed_users()
    seed_products()
    seed_reviews()
    seed_favorites()
    seed_cart_items()

@seed_commands.command('undo')
def undo():
    undo_cart_items()
    undo_favorites()
    undo_reviews()
    undo_products()
    undo_users()
