# PRODUCTS Routes (browse catalog)

# IMPORTS
from flask import Blueprint, jsonify
from sqlalchemy import text
from app.db import get_db

# DEFINE BLUEPRINT
products_bp = Blueprint('products', __name__)


# ─── EP-XX: Get all products ──────────────────────────────────────

@products_bp.route('/api/products', methods=['GET'])
def get_products():
    db = next(get_db())
    try:
        rows = db.execute(text("""
            SELECT p.id, p.title, p.description, p.price,
                   p.stock_quantity, p.is_verified, p.image, n.need
            FROM products p
            LEFT JOIN product_needs n ON n.product_id = p.id
            ORDER BY p.id
        """)).mappings().all()

        result = []
        for r in rows:
            result.append({
                'id':          r['id'],
                'title':       r['title'],
                'description': r['description'],
                'price':       float(r['price']),   # Decimal → float for JSON
                'stock':       r['stock_quantity'],
                'verified':    r['is_verified'],
                'image':       r['image'],
                'category':    r['need'],
            })

        return jsonify({'products': result}), 200

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500