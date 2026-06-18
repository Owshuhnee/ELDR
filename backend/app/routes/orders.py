# ORDERS ROUTES
# Handles fetching order history for the logged-in user

# ─── IMPORTS ──────────────────────────────────────────────────────────────────
from flask import Blueprint, jsonify, session
from app.db import SessionLocal
from app.models import Order, OrderItem, Product


# ─── BLUEPRINT ────────────────────────────────────────────────────────────────
# url_prefix means every route here automatically starts with /api/orders
orders_bp = Blueprint('orders', __name__, url_prefix='/api/orders')


# ─── EP-142: Get Order History  ────────────────────────────────────────────────
# Returns all orders for the logged-in user, including items inside each order

@orders_bp.route('/history', methods=['GET'])
def get_order_history():

    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    user_id = session['user_id']
    db      = SessionLocal()

    try:
        # Find all orders where this user is the buyer
        # Order by newest first
        orders = db.query(Order).filter(
            Order.buyer_id == user_id
        ).order_by(Order.created_at.desc()).all()

        result = []
        for order in orders:

            # Get all items belonging to this order
            items = db.query(OrderItem).filter(
                OrderItem.order_id == order.id
            ).all()

            # Build the items list with product names
            items_list = []
            for item in items:
                product = db.query(Product).filter(
                    Product.id == item.product_id
                ).first()

                items_list.append({
                    'id':       item.id,
                    'name':     product.title if product else 'Unknown',
                    'quantity': item.quantity,
                    'price':    float(item.price_at_purchase)
                })

            result.append({
                'id':         order.id,
                'date':       order.created_at.strftime('%d %B %Y'),
                'status':     order.status,
                'total':      float(order.total_amount),
                'items':      items_list
            })

        return jsonify({'orders': result}), 200

    finally:
        db.close()