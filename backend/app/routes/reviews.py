# ─── IMPORTS ──────────────────────────────────────────────────────────────────
from flask import Blueprint, jsonify
from app.db import SessionLocal
from app.models import Review, User


# ─── BLUEPRINT ────────────────────────────────────────────────────────────────
# url_prefix means every route here starts with /api/reviews
reviews_bp = Blueprint('reviews', __name__, url_prefix='/api/reviews')


# ─── GET REVIEWS FOR A PRODUCT ────────────────────────────────────────────────
# This is public — no login required to read reviews
@reviews_bp.route('/<int:product_id>', methods=['GET'])
def get_reviews(product_id):
   
    db = SessionLocal()
    try:
        reviews = db.query(Review).filter_by(product_id=product_id).all()
      
        result = []
        for review in reviews:

      
            if review.user_id:
                user = db.query(User).filter(User.id == review.user_id).first()
            else:
                user = None

            if user:
                display_name = f"{user.first_name} {user.last_name[0]}."
            else:
                display_name = "Anonymous"

            result.append({
                'id':           review.id,
                'rating':       review.rating,
                'comment':      review.comment,
                'reviewer':     display_name,
                'created_at':   review.created_at.isoformat() if review.created_at else None,
           })

        return jsonify({'reviews': result, 'count': len(result)}), 200

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        db.close()
    