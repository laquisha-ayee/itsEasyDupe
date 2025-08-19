from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager
from .models import db, User, Product, Review, CartItem, Favorite
from app.api import register_blueprints

login_manager = LoginManager()
login_manager.login_view = 'auth.unauthorized'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    Migrate(app, db)
    login_manager.init_app(app)

    from .seeds import seed_commands
    app.cli.add_command(seed_commands)

  
    register_blueprints(app)

    return app