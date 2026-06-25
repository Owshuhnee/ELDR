# PRODUCTS ROUTES
# Handles browsing the product catalogue

# ─── IMPORTS ──────────────────────────────────────────────────────────────────
from flask import Blueprint, jsonify, request
from app.models import Product, ProductNeed
from sqlalchemy import text
from app.db import SessionLocal


# ─── BLUEPRINT ────────────────────────────────────────────────────────────────
# url_prefix means every route here automatically starts with /api/products
# NOTE: Jove fixed route prefix (removed /api/products from decorator) and
# switched db session from next(get_db()) to SessionLocal() — 18 June 2026
products_bp = Blueprint('products', __name__, url_prefix='/api/products')


# ─── EP-XX: Get All Products  ─────────────────────────────────────────────────
# Returns the full product catalogue with category needs joined from product_needs

@products_bp.route('/', methods=['GET'])
def get_products():
    db = SessionLocal()
    try:

        # Raw SQL used here to join product_needs in one query
        # This could be refactored to ORM-style joins after submission
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
    

# ─── EP-125/126: Create a Product  ────────────────────────────────────────────
# Sellers POST a new listing; it saves unverified until an admin approves it
@products_bp.route('/', methods=['POST'])
def create_product():
    db = SessionLocal()
    try:
        data = request.get_json() or {}

        # Validate the fields the table cannot be NULL without
        title = data.get('title')
        price = data.get('price')
        if not title or price is None:
            return jsonify({'error': 'Title and price are required'}), 400

        # New listings always start unverified — EP-27 admin panel approves them
        product = Product(
            seller_id      = data.get('seller_id'),
            title          = title,
            description    = data.get('description'),
            price          = price,
            stock_quantity = data.get('stock', 0),
            image          = data.get('image'),
            is_verified    = False,
        )

        db.add(product)
        db.flush()              # sends INSERT now so Postgres assigns product.id

        # Attach the category as a product_needs row, if one was provided
        category = data.get('category')
        if category:
            db.add(ProductNeed(product_id=product.id, need=category))

        db.commit()             # product + need committed together, one transaction

        return jsonify({
            'id':       product.id,
            'title':    product.title,
            'price':    float(product.price),
            'verified': product.is_verified,
            'category': category,
        }), 201

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()
