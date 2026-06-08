# CART Routes (add, view, remove, checkout)


@cart_bp.route('/api/cart/checkout', methods=['POST'])
def checkout():
    data    = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400

    db = next(get_db())
    try:
        cart_items = db.query(CartItem).filter_by(user_id=user_id).all()

        if not cart_items:
            return jsonify({'error': 'Cart is empty'}), 400

        product_ids = [item.product_id for item in cart_items]

        from app.models import Product
        products = db.query(Product).filter(Product.id.in_(product_ids)).all()

        product_map = {product.id: product for product in products}

        total = 0
        for item in cart_items:
            product = product_map[item.product_id]
            total  += product.price * item.quantity

        new_order = Order(
            buyer_id     = user_id,
            total_amount = total,
            status       = 'pending'
        )
        db.add(new_order)
        db.flush()

        for item in cart_items:
            product    = product_map[item.product_id]
            order_item = OrderItem(
                order_id          = new_order.id,
                product_id        = item.product_id,
                quantity          = item.quantity,
                price_at_purchase = product.price
            )
            db.add(order_item)

        for item in cart_items:
            db.delete(item)

        db.commit()

        return jsonify({
            'message':  'Order placed successfully',
            'order_id': new_order.id,
            'total':    float(total)
        }), 201

    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500