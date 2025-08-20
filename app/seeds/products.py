from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


category_sellers = {
    "Candles": 1,       # Demo
    "Shelves": 1,
    "Journals": 1,
    "Macrame": 2,       # Marnie
    "Wooden Toys": 2,
    "T-Shirts": 3       # Bobbie
}

def seed_products():
    products = [
        # Candles
        Product(
            title="Tea Candles",
            description="tea candles set. so many fun , fruity scents",
            price=14.00,
            image_url="https://images.pexels.com/photos/33197/tealight-candles-tea-lights-wax.jpg",
            category="Candles",
            seller_id=category_sellers["Candles"]
        ),
        Product(
            title="Flower Candle",
            description="Organic soy wax candle made with organic flowers from my garden.",
            price=10.00,
            image_url="https://images.pexels.com/photos/20419149/pexels-photo-20419149.jpeg",
            category="Candles",
            seller_id=category_sellers["Candles"]
        ),
        Product(
            title="Citrus Candle",
            description="Handmade candle with a citrus twist.",
            price=10.00,
            image_url="https://images.pexels.com/photos/2171079/pexels-photo-2171079.jpeg",
            category="Candles",
            seller_id=category_sellers["Candles"]
        ),

        # Shelves
        Product(
            title="Hanging Shelves",
            description="rope-hung wooden shelves",
            price=40.00,
            image_url="https://images.pexels.com/photos/4503943/pexels-photo-4503943.jpeg",
            category="Shelves",
            seller_id=category_sellers["Shelves"]
        ),
        Product(
            title="Box Shelves",
            description="3 cube shelves for you to fill with all your favorites",
            price=40.00,
            image_url="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
            category="Shelves",
            seller_id=category_sellers["Shelves"]
        ),
        Product(
            title="Triangle Shelves",
            description="customizable triangle shelves",
            price=50.00,
            image_url="https://images.pexels.com/photos/2228583/pexels-photo-2228583.jpeg",
            category="Shelves",
            seller_id=category_sellers["Shelves"]
        ),

        # Journals
        Product(
            title="Simple Journal",
            description="2 pack of journals, made with love",
            price=12.00,
            image_url="https://images.pexels.com/photos/1018133/pexels-photo-1018133.jpeg",
            category="Journals",
            seller_id=category_sellers["Journals"]
        ),
        Product(
            title="Rule the World Journal",
            description="fun journal with motivational quotes!",
            price=5.00,
            image_url="https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg",
            category="Journals",
            seller_id=category_sellers["Journals"]
        ),
        Product(
            title="Lemonade Journal",
            description="cheerful journal with bright pages",
            price=5.00,
            image_url="https://images.pexels.com/photos/2388922/pexels-photo-2388922.jpeg",
            category="Journals",
            seller_id=category_sellers["Journals"]
        ),

        # Macrame
        Product(
            title="Small Wall Hanging",
            description="Handwoven macrame wall art for cozy corners.",
            price=18.00,
            image_url="https://images.pexels.com/photos/6806697/pexels-photo-6806697.jpeg",
            category="Macrame",
            seller_id=category_sellers["Macrame"]
        ),
        Product(
            title="Plant Hanger",
            description="Macrame plant holder for hanging.",
            price=20.00,
            image_url="https://images.pexels.com/photos/9731995/pexels-photo-9731995.jpeg",
            category="Macrame",
            seller_id=category_sellers["Macrame"]
        ),
        Product(
            title="Dream Catcher",
            description="macrame dream catcher made with only natural products, no harmful chemicals.",
            price=24.00,
            image_url="https://images.pexels.com/photos/5602532/pexels-photo-5602532.jpeg",
            category="Macrame",
            seller_id=category_sellers["Macrame"]
        ),

        # Wooden Toys
        Product(
            title="Counter Toy",
            description="red wood toy counter for your young accountant",
            price=12.00,
            image_url="https://images.pexels.com/photos/7269674/pexels-photo-7269674.jpeg",
            category="Wooden Toys",
            seller_id=category_sellers["Wooden Toys"]
        ),
        Product(
            title="Animal Set",
            description="Hand-carved wooden animals for imaginative play.",
            price=14.00,
            image_url="https://images.pexels.com/photos/3663055/pexels-photo-3663055.jpeg",
            category="Wooden Toys",
            seller_id=category_sellers["Wooden Toys"]
        ),
        Product(
            title="Alphabet Letters",
            description="Wooden alphabet blocks for spelling and stacking.",
            price=10.00,
            image_url="https://images.pexels.com/photos/7335412/pexels-photo-7335412.jpeg",
            category="Wooden Toys",
            seller_id=category_sellers["Wooden Toys"]
        ),

        # T-Shirts
        Product(
            title="Busy at Home Tee",
            description="a fun simple tee shirt made while was busy",
            price=10.00,
            image_url="https://images.pexels.com/photos/6256315/pexels-photo-6256315.jpeg",
            category="T-Shirts",
            seller_id=category_sellers["T-Shirts"]
        ),
        Product(
            title="Cartoon Tee's",
            description="pack of fun cartoon nostalgia ",
            price=30.00,
            image_url="https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg",
            category="T-Shirts",
            seller_id=category_sellers["T-Shirts"]
        ),
        Product(
            title="Kind is Cool Tee",
            description="a great message on a comfy tee!",
            price=7.00,
            image_url="https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg",
            category="T-Shirts",
            seller_id=category_sellers["T-Shirts"]
        ),
    ]

# Log each product's title, category, and seller assignment for clarity.
    for product in products:
        db.session.add(product)
        print(f"Seeding '{product.title}' → Category: {product.category} → Seller ID: {product.seller_id}")

    db.session.commit()

def undo_products():
    try:
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM products;"))
            try:
                db.session.execute(text('DELETE FROM sqlite_sequence WHERE name="products";'))
            except Exception:
                pass
        db.session.commit()
        print("Cleared products table.")
    except Exception:
        print("Skipping products undo due to an error.")