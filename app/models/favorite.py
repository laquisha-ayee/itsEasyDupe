from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Favorite(db.Model):
    __tablename__ = 'favorites'


    if environment == "production":
        __table_args__ = (
            db.UniqueConstraint('user_id', 'product_id', name='unique_user_product_fav'),
            {'schema': SCHEMA}
        )
    else:
        __table_args__ = (
            db.UniqueConstraint('user_id', 'product_id', name='unique_user_product_fav'),
        )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        nullable=False
    )
    product_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('products.id')),
        nullable=False
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'created_at': self.created_at.isoformat()
        }