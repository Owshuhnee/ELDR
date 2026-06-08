# ONBOARDING ROUTES 

# IMPORTS
from flask import Blueprint, request, jsonify
from app.db import SessionLocal
from app.models import User
from app import bcrypt

# DEFINE BLUEPRINT
onboarding_bp = Blueprint('onboarding', __name__, url_prefix='/api/onboarding')

# ROUTES
@onboarding_bp.route('/submit', methods=['POST'])
def submit_onboarding():
    data = request.get_json()
    user_id = data.get('user_id')
    needs_mobility = data.get('needs_mobility', False)
    needs_vision = data.get('needs_vision', False)

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        user.needs_mobility = needs_mobility
        user.needs_vision = needs_vision
        user.onboarding_complete = True

        db.commit()

        return jsonify({'message': 'Onboarding complete'}), 200

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        db.close()