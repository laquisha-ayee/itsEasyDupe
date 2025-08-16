from app.models import db, CartItem
from sqlalchemy.sql import text



def seed_cart_items():
    cart_items = [
        # Demo 
        CartItem(user_id=1, product_id=3, quantity=2),  # Demo added 2 of product 3
        CartItem(user_id=1, product_id=7, quantity=1),  # Demo added 1 of product 7

        # OtherUsers
        CartItem(user_id=2, product_id=5, quantity=1),
        CartItem(user_id=3, product_id=1, quantity=4),
    ]

    for item in cart_items:
        db.session.add(item)
        print(f"CartItem → User {item.user_id} added Product {item.product_id} (Qty: {item.quantity})")

    db.session.commit()
    print("Seeded cart_items table.")

def undo_cart_items():
    db.session.execute(text("DELETE FROM cart_items;"))
    db.session.commit()
    print("Cleared cart_items table.")
