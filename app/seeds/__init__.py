from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .favorites import seed_favorites, undo_favorites
from app.models import User, Product, Review, Favorite
from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

# Individual seed commands
@seed_commands.command('users')
def seed_users_command():
    print("Seeding users...")
    seed_users()

@seed_commands.command('products')
def seed_products_command():
    print("Seeding products...")
    seed_products()

@seed_commands.command('reviews')
def seed_reviews_command():
    print("Seeding reviews...")
    seed_reviews()

@seed_commands.command('favorites')
def seed_favorites_command():
    print("Seeding favorites...")
    seed_favorites()

# Individual undo commands
@seed_commands.command('undo_users')
def undo_users_command():
    print("Undoing users...")
    undo_users()

@seed_commands.command('undo_products')
def undo_products_command():
    print("Undoing products...")
    undo_products()

@seed_commands.command('undo_reviews')
def undo_reviews_command():
    print("Undoing reviews...")
    undo_reviews()

@seed_commands.command('undo_favorites')
def undo_favorites_command():
    print("Undoing favorites...")
    undo_favorites()

# Seed all models
@seed_commands.command('all')
def seed():
    if environment == 'production':
        print("Production environment detected. Undoing existing seed data...")
        undo_favorites()
        undo_reviews()
        undo_products()
        undo_users()
    print("Seeding all data...")
    seed_users()
    seed_products()
    seed_reviews()
    seed_favorites()

# Undo all models
@seed_commands.command('undo')
def undo():
    print("Undoing all seed data...")
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