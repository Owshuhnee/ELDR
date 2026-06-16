# Family & Caregiver routes
# Handles linking elders with family members and caregivers

from flask import Blueprint, request, jsonify, session
from app.db import SessionLocal
from app.models import User, UserLink

# Blueprint works like a mini app — groups related routes together
# url_prefix means every route here automatically starts with /api/caregiver
caregiver_bp = Blueprint('caregiver', __name__, url_prefix='/api/caregiver')


# POST /api/caregiver/link
# Caregiver sends a link request to an elder using their email
@caregiver_bp.route('/link', methods=['POST'])
def send_link_request():

    # Check the user is logged in — session holds their id from login
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    # Grab the JSON body sent from the frontend
    data = request.get_json()

    # Pull out the elder's email and relationship type from the request
    elder_email  = data.get('elder_email')
    relationship = data.get('relationship', 'caregiver')

    # If no email was provided, stop here and tell the frontend
    if not elder_email:
        return jsonify({'error': 'Elder email is required'}), 400

    db = SessionLocal()

    try:
        # Look up the elder by email in the users table
        elder = db.query(User).filter(User.email == elder_email).first()

        # If no user found with that email, return an error
        if not elder:
            return jsonify({'error': 'No user found with that email'}), 404

        # Make sure the target user is actually an elder, not another caregiver
        if elder.role != 'elder':
            return jsonify({'error': 'That user is not an elder account'}), 400

        # Get the logged-in user's id from the session
        helper_id = session['user_id']

        # Check if a link already exists between these two users
        existing = db.query(UserLink).filter(
            UserLink.elder_id  == elder.id,
            UserLink.helper_id == helper_id
        ).first()

        if existing:
            return jsonify({'error': 'Link request already exists'}), 400

        # Create the new link row — status defaults to 'pending'
        new_link = UserLink(
            elder_id     = elder.id,
            helper_id    = helper_id,
            relationship = relationship
        )

        db.add(new_link)
        db.commit()

        return jsonify({'message': 'Link request sent successfully'}), 201

    finally:
        # Always close the database connection when done
        db.close()


# POST /api/caregiver/accept
# Elder accepts a pending link request from a caregiver
@caregiver_bp.route('/accept', methods=['POST'])
def accept_link_request():

    # Make sure the elder is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data = request.get_json()

    # The frontend sends the helper's id whose request we want to accept
    helper_id = data.get('helper_id')

    if not helper_id:
        return jsonify({'error': 'helper_id is required'}), 400

    db = SessionLocal()

    try:
        # Find the pending link where this user is the elder
        # and the helper matches the id sent from the frontend
        link = db.query(UserLink).filter(
            UserLink.elder_id  == session['user_id'],
            UserLink.helper_id == helper_id,
            UserLink.status    == 'pending'
        ).first()

        # If no matching pending request found, return an error
        if not link:
            return jsonify({'error': 'No pending request found'}), 404

        # Update the status from 'pending' to 'accepted'
        link.status = 'accepted'
        db.commit()

        return jsonify({'message': 'Link request accepted'}), 200

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