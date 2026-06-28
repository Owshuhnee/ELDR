# ONBOARDING ROUTES
# Handles onboarding form submission for elder users

# ─── IMPORTS ──────────────────────────────────────────────────────────────────
from flask import Blueprint, request, jsonify
from app.db import SessionLocal
from app.models import User
from app import bcrypt


# ─── BLUEPRINT ────────────────────────────────────────────────────────────────
# url_prefix means every route here automatically starts with /api/onboarding
onboarding_bp = Blueprint('onboarding', __name__, url_prefix='/api/onboarding')


# ─── EP-2: Submit Onboarding  ─────────────────────────────────────────────────
# Saves the elder's accessibility needs and marks onboarding as complete

@onboarding_bp.route('/submit', methods=['POST'])
def submit_onboarding():

    data           = request.get_json()
    user_id        = data.get('user_id')
    needs_mobility = data.get('needs_mobility', False)
    needs_vision   = data.get('needs_vision', False)

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    db = SessionLocal()

    try:
        # Look up the user by the ID sent from the frontend
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Save accessibility preferences to the user record
        user.needs_mobility      = needs_mobility
        user.needs_vision        = needs_vision

        # Mark onboarding as finished so the frontend knows not to show it again
        user.onboarding_complete = True

        db.commit()

        return jsonify({'message': 'Onboarding complete'}), 200

    except Exception as e:
        # Roll back any partial changes if something went wrong
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        # Always close the database connection, even if an error happened
        db.close()