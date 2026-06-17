#This is where all the models live

from app.db import Base
from sqlalchemy import Column, Integer, String, DateTime, Numeric, ForeignKey, Boolean
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "users"

    id                  = Column(Integer, primary_key=True)
    role                = Column(String(50), nullable=False, default="elder")
    first_name          = Column(String(100), nullable=False)
    last_name           = Column(String(100), nullable=False)
    password_hash       = Column(String(255), nullable=False)
    email               = Column(String(255), unique=True, nullable=False)
    phone_number        = Column(String(20))
    created_at          = Column(DateTime(timezone=True), server_default=func.now())


class Product(Base):
    __tablename__ = "products"

    id                  = Column(Integer, primary_key=True)
    seller_id           = Column(Integer, ForeignKey('users.id'), nullable=True)
    title               = Column(String(255), nullable=False)
    description         = Column(String, nullable=True)
    price               = Column(Numeric(10, 2), nullable=False)
    stock_quantity      = Column(Integer, nullable=False, default=0)
    is_verified         = Column(Boolean, default=False)
    created_at          = Column(DateTime(timezone=True), server_default=func.now())


class CartItem(Base):
    __tablename__ = "cart_items"

    id                  = Column(Integer, primary_key=True)
    user_id             = Column(Integer, ForeignKey('users.id'), nullable=False)
    product_id          = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity            = Column(Integer, nullable=False, default=1)


class Order(Base):
    __tablename__ = "orders"

    id                  = Column(Integer, primary_key=True)
    buyer_id            = Column(Integer, ForeignKey('users.id'), nullable=False)
    recipient_id        = Column(Integer, ForeignKey('users.id'), nullable=True)        # recipient_id is set when a caregiver shops for an elder - nullable means optional
    total_amount        = Column(Numeric(10, 2), nullable=False)
    status              = Column(String(50), nullable=False, default='pending')
    created_at          = Column(DateTime(timezone=True), server_default=func.now())


class OrderItem(Base):
    __tablename__ = "order_items"

    id                  = Column(Integer, primary_key=True)
    order_id            = Column(Integer, ForeignKey('orders.id'), nullable=False)
    product_id          = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity            = Column(Integer, nullable=False)
    price_at_purchase   = Column(Numeric(10, 2), nullable=False)


class UserLink(Base):
    __tablename__ = "user_links"

    id                  = Column(Integer, primary_key=True)
    elder_id            = Column(Integer, ForeignKey('users.id'), nullable=False)
    helper_id           = Column(Integer, ForeignKey('users.id'), nullable=False)
    relationship        = Column(String(50), nullable=False, default='family')
    status              = Column(String(50), nullable=False, default='pending')
    created_at          = Column(DateTime(timezone=True), server_default=func.now())