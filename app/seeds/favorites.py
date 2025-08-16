from sqlalchemy import text
from datetime import datetime
from app.models import db, Favorite

def seed_favorites():
    favorites = [
        # User 1
        Favorite(user_id=1, product_id=4, created_at=datetime.utcnow()),
        Favorite(user_id=1, product_id=7, created_at=datetime.utcnow()),
        Favorite(user_id=1, product_id=2, created_at=datetime.utcnow()),
        Favorite(user_id=1, product_id=10, created_at=datetime.utcnow()),
        Favorite(user_id=1, product_id=13, created_at=datetime.utcnow()),
        Favorite(user_id=1, product_id=16, created_at=datetime.utcnow()),

        # User 2
        Favorite(user_id=2, product_id=9, created_at=datetime.utcnow()),
        Favorite(user_id=2, product_id=6, created_at=datetime.utcnow()),
        Favorite(user_id=2, product_id=1, created_at=datetime.utcnow()),
        Favorite(user_id=2, product_id=14, created_at=datetime.utcnow()),
        Favorite(user_id=2, product_id=11, created_at=datetime.utcnow()),
        Favorite(user_id=2, product_id=17, created_at=datetime.utcnow()),

        # User 3
        Favorite(user_id=3, product_id=12, created_at=datetime.utcnow()),
        Favorite(user_id=3, product_id=15, created_at=datetime.utcnow()),
        Favorite(user_id=3, product_id=18, created_at=datetime.utcnow()),
        Favorite(user_id=3, product_id=5, created_at=datetime.utcnow()),
    ]

    # Log each favorite for clarity
    for fav in favorites:
        db.session.add(fav)
        print(f"User {fav.user_id} favorited Product {fav.product_id}")

    db.session.commit()

def undo_favorites():
    db.session.execute(text('DELETE FROM favorites'))
    db.session.commit()
    print("All favorites deleted.")





