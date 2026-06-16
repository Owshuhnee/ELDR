# Family & Caregiver routes
# Handles linking elders with family members and caregivers

from flask import Blueprint, request, jsonify, session
from app.db import SessionLocal
from app.models import User, UserLink

# Blueprint works like a mini app — groups related routes together
# url_prefix means every route here automatically starts with /api/caregiver
caregiver_bp = Blueprint('caregiver', __name__, url_prefix='/api/caregiver')


# POST /api/caregiver/accept
# Elder accepts a pending link request from a caregiver
@caregiver_bp.route('/accept', methods=['POST'])
def accept_link_request():

    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data      = request.get_json()
    helper_id = data.get('helper_id')

    if not helper_id:
        return jsonify({'error': 'helper_id is required'}), 400

    db = SessionLocal()

    try:
        link = db.query(UserLink).filter(
            UserLink.elder_id  == session['user_id'],
            UserLink.helper_id == helper_id,
            UserLink.status    == 'pending'
        ).first()

        if not link:
            return jsonify({'error': 'No pending request found'}), 404

        link.status = 'accepted'
        db.commit()

        return jsonify({'message': 'Link request accepted'}), 200

    finally:
        db.close()


# POST /api/caregiver/link
# Either a caregiver sends a request to an elder
# OR an elder sends a request to a caregiver
@caregiver_bp.route('/link', methods=['POST'])
def send_link_request():

    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data         = request.get_json()
    target_email = data.get('target_email')
    relationship = data.get('relationship', 'caregiver')

    if not target_email:
        return jsonify({'error': 'target_email is required'}), 400

    db = SessionLocal()

    try:
        # Find the target user by email
        target = db.query(User).filter(User.email == target_email).first()

        if not target:
            return jsonify({'error': 'No user found with that email'}), 404

        user_id     = session['user_id']
        logged_user = db.query(User).filter(User.id == user_id).first()

        # Work out who is elder and who is helper based on roles
        # If logged-in user is elder, they are inviting a caregiver
        # If logged-in user is caregiver, they are inviting an elder
        if logged_user.role == 'elder':
            if target.role not in ['caregiver', 'family']:
                return jsonify({'error': 'That user is not a caregiver account'}), 400
            elder_id  = user_id
            helper_id = target.id
        else:
            if target.role != 'elder':
                return jsonify({'error': 'That user is not an elder account'}), 400
            elder_id  = target.id
            helper_id = user_id

        # Check if a link already exists
        existing = db.query(UserLink).filter(
            UserLink.elder_id  == elder_id,
            UserLink.helper_id == helper_id
        ).first()

        if existing:
            return jsonify({'error': 'Link request already exists'}), 400

        new_link = UserLink(
            elder_id     = elder_id,
            helper_id    = helper_id,
            relationship = relationship
        )

        db.add(new_link)
        db.commit()

        return jsonify({'message': 'Link request sent successfully'}), 201

    finally:
        db.close()


# GET /api/caregiver/links
# Returns all accepted links for the logged-in user
# Works for both elders (shows their caregivers) and caregivers (shows their elders)
@caregiver_bp.route('/links', methods=['GET'])
def get_links():

    # Make sure the user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    user_id = session['user_id']

    db = SessionLocal()

    try:
        # Find the logged-in user to check their role
        user = db.query(User).filter(User.id == user_id).first()

        # If the logged-in user is an elder, find all their caregivers
        if user.role == 'elder':
            links = db.query(UserLink).filter(
                UserLink.elder_id == user_id,
                UserLink.status   == 'accepted'
            ).all()

            # Build a list of caregiver details to return
            result = []
            for link in links:
                helper = db.query(User).filter(User.id == link.helper_id).first()
                result.append({
                    'link_id':      link.id,
                    'helper_id':    helper.id,
                    'name':         f"{helper.first_name} {helper.last_name}",
                    'email':        helper.email,
                    'relationship': link.relationship
                })

        # If the logged-in user is a caregiver, find all their elders
        else:
            links = db.query(UserLink).filter(
                UserLink.helper_id == user_id,
                UserLink.status    == 'accepted'
            ).all()

            # Build a list of elder details to return
            result = []
            for link in links:
                elder = db.query(User).filter(User.id == link.elder_id).first()
                result.append({
                    'link_id':      link.id,
                    'elder_id':     elder.id,
                    'name':         f"{elder.first_name} {elder.last_name}",
                    'email':        elder.email,
                    'relationship': link.relationship
                })

        return jsonify({'links': result}), 200

    finally:
        db.close()

# DELETE /api/caregiver/unlink
# Either the elder or caregiver can remove an existing link
@caregiver_bp.route('/unlink', methods=['DELETE'])
def unlink():

    # Make sure the user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data = request.get_json()

    # The frontend sends the link_id they want to remove
    link_id = data.get('link_id')

    if not link_id:
        return jsonify({'error': 'link_id is required'}), 400

    db = SessionLocal()

    try:
        # Find the link by id
        link = db.query(UserLink).filter(UserLink.id == link_id).first()

        # If no link found, return an error
        if not link:
            return jsonify({'error': 'Link not found'}), 404

        # Make sure the logged-in user is part of this link
        # They must be either the elder or the helper — not a stranger
        user_id = session['user_id']
        if link.elder_id != user_id and link.helper_id != user_id:
            return jsonify({'error': 'Not authorised to remove this link'}), 403

        # Delete the link row from the database
        db.delete(link)
        db.commit()

        return jsonify({'message': 'Link removed successfully'}), 200

    finally:
        db.close()