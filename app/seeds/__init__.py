from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .favorites import seed_favorites, undo_favorites
from .cart_items import seed_cart_items, undo_cart_items

from app.models import User, Product, Review, Favorite, CartItem
from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

# Seed all models
@seed_commands.command('all')
def seed():
    if environment == 'production':
        print("Production environment detected. Undoing existing seed data...")
        undo_cart_items()
        undo_favorites()
        undo_reviews()
        undo_products()
        undo_users()

    print("Seeding all data...")
    seed_users()
    seed_products()
    seed_reviews()
    seed_favorites()
    seed_cart_items()

# Undo all models
@seed_commands.command('undo')
def undo():
    print("Undoing all seed data...")
    undo_cart_items()
    undo_favorites()
    undo_reviews()
    undo_products()
    undo_users()

# Show current database status
@seed_commands.command('status')
def status():
    print("Current database status:")
    print(f"- Users: {User.query.count()}")
    print(f"- Products: {Product.query.count()}")
    print(f"- Reviews: {Review.query.count()}")
    print(f"- Favorites: {Favorite.query.count()}")
    print(f"- CartItems: {CartItem.query.count()}")



    