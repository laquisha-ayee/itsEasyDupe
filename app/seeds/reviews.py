from app.models import db, Review
from datetime import datetime
from sqlalchemy import text


def seed_reviews():
    reviews = [
        # User 1
        Review(user_id=1, product_id=4, rating=5, comment="Smells amazing!", created_at=datetime.utcnow()),
        Review(user_id=1, product_id=7, rating=4, comment="Beautiful design, but a bit pricey.", created_at=datetime.utcnow()),
        Review(user_id=1, product_id=2, rating=5, comment="Just what i needed great quality!", created_at=datetime.utcnow()),

        # User 2
        Review(user_id=2, product_id=6, rating=3, comment="Shipping was so slow. but I did LOVE the product.", created_at=datetime.utcnow()),
        Review(user_id=2, product_id=9, rating=4, comment="Looks perfect in my space", created_at=datetime.utcnow()),

        # User 3
        Review(user_id=3, product_id=12, rating=5, comment="So stretchy and soft. perfect for my curves.", created_at=datetime.utcnow()),
        Review(user_id=3, product_id=15, rating=4, comment="color faded after first wash.", created_at=datetime.utcnow()),
        Review(user_id=3, product_id=18, rating=5, comment="Love this! buying more now!", created_at=datetime.utcnow()),
    ]

    for review in reviews:
        db.session.add(review)
        print(f"User {review.user_id} reviewed Product {review.product_id}: '{review.comment}'")

    db.session.commit()


from sqlalchemy import text

def undo_reviews():
    db.session.execute(text('DELETE FROM reviews'))
    db.session.commit()
    print("All reviews deleted.")