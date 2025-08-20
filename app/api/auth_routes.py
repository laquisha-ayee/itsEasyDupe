from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user
from flask_wtf.csrf import generate_csrf

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/csrf/', methods=['GET'])
def get_csrf():
    token = generate_csrf()
    resp = jsonify({'csrf_token': token})
    resp.set_cookie('csrf_token', token)
    return resp

@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return {'errors': ['Invalid credentials']}, 401

    login_user(user)
    return user.to_dict()

@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': {'message': 'Unauthorized'}}, 401