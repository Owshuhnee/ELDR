# AUTH ROUTES
# Handles register, login, and forgot password

# ─── IMPORTS ──────────────────────────────────────────────────────────────────
from flask import Blueprint, request, jsonify, session
from app.db import SessionLocal
from app.models import User
from app import bcrypt


# ─── BLUEPRINT ────────────────────────────────────────────────────────────────
# url_prefix means every route here automatically starts with /api/auth
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


# ─── EP-79: Register  ─────────────────────────────────────────────────────────
# Creates a new user account and saves it to the database

@auth_bp.route('/register', methods=['POST'])
def register():

    data             = request.get_json()
    first_name       = data.get('firstName')
    last_name        = data.get('lastName')
    email            = data.get('email')
    password         = data.get('password')
    confirm_password = data.get('confirmPassword')
    phone_number     = data.get('phone')
    # Default to 'elder' if no role is sent from the frontend
    role             = data.get('role', 'elder')

    # Reject the request if any required field is missing
    if not all([first_name, last_name, email, password, role]):
        return jsonify({'error': 'All fields are required'}), 400

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    db = SessionLocal()

    try:
        # Check if this email is already in the database
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 400

        # bcrypt hashes the password — never store plain text passwords
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        # Build the new User object with all the collected fields
        new_user = User(
            first_name    = first_name,
            last_name     = last_name,
            email         = email,
            password_hash = password_hash,
            phone_number  = phone_number,
            role          = role
        )

        db.add(new_user)
        db.commit()
        # db.refresh loads the auto-generated id back into new_user
        db.refresh(new_user)

        return jsonify({
            'message': 'Registration successful',
            'user': {
                'id':         new_user.id,
                'email':      new_user.email,
                'first_name': new_user.first_name,
                'last_name':  new_user.last_name,
                'role':       new_user.role
            }
        }), 201

    except Exception as e:
        # Roll back any partial changes if something went wrong
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        # Always close the database connection, even if an error happened
        db.close()


# ─── EP-11: Login  ────────────────────────────────────────────────────────────
# Checks credentials and stores the user in the session if valid

@auth_bp.route('/login', methods=['POST'])
def login():

    data     = request.get_json()
    email    = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Email and password are required'}), 400

    db = SessionLocal()

    try:
        # Look up the user by email
        user = db.query(User).filter(User.email == email).first()

        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401

        # bcrypt compares the plain text input against the stored hash
        if not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid email or password'}), 401

        # Session stores who is logged in — used by protected routes
        session['user_id']    = user.id
        session['user_email'] = user.email
        session['user_role']  = user.role

        return jsonify({
            'message': 'Login successful',
            'user': {
                'id':         user.id,
                'email':      user.email,
                'first_name': user.first_name,
                'last_name':  user.last_name,
                'role':       user.role
            }
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        db.close()


# ─── EP-88: Forgot Password  ──────────────────────────────────────────────────
# Accepts an email address and responds with a generic success message
# The vague response is intentional — it prevents email enumeration attacks

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():

    data  = request.get_json()
    # .strip() removes accidental whitespace, .lower() normalises the email
    email = data.get('email', '').strip().lower()

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    db = SessionLocal()

    try:
        # We look up the user but deliberately don't tell the caller if they exist
        user = db.query(User).filter(User.email == email).first()

        return jsonify({
            'message': 'If that email is registered, a reset link has been sent.'
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        db.close()
