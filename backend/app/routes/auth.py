# AUTH Routes (login, register, forgot password)

# IMPORTS
from flask import Blueprint, request, jsonify, session
from app.db import SessionLocal
from app.models import User
from app import bcrypt

# DEFINE BLUEPRINT
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# ROUTES
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Get data from form
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    phone_number = data.get('phone')
    role = data.get('role', 'elder')

    # Basic validation
    if not all([first_name, last_name, email, password, role]):
        return jsonify({'error': 'All fields are required'}), 400

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    db = SessionLocal()
    try:
        # Check if email already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 400

        # Hash the password
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new user
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=password_hash,
            phone_number=phone_number,
            role=role
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return jsonify({
            'message': 'Registration successful',
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                'first_name': new_user.first_name,
                'last_name': new_user.last_name,
                'role': new_user.role
            }
        }), 201

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        db.close()

# LOGIN
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    # Basic validation
    if not all([email, password]):
        return jsonify({'error': 'Email and password are required'}), 400

    db = SessionLocal()
    try:
        # Find user by email
        user = db.query(User).filter(User.email == email).first()

        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401

        # Check password
        if not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid email or password'}), 401

        # Store user in session
        session['user_id'] = user.id
        session['user_email'] = user.email
        session['user_role'] = user.role

        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role
            }
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        db.close()


# FORGOT PASSWORD
@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email', '').strip().lower()

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()

        return jsonify({
            'message': 'If that email is registered, a reset link has been sent.'
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        db.close()
