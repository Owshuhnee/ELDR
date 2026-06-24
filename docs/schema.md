# ELDR – Database Schema

> PostgreSQL hosted on Neon DB (AWS Sydney region).  
> All tables are in the `public` schema.

---

## Custom Types (ENUMs)

```sql
CREATE TYPE user_role AS ENUM ('elder', 'caregiver');
CREATE TYPE accessibility_need AS ENUM ('mobility', 'vision', 'hearing', 'daily_living');
```

---

## Tables

### `users`
Stores all registered accounts. Role determines whether the user goes through onboarding (elder) or the caregiver flow.

| Column | Type | Constraints | Default |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | — |
| email | VARCHAR(255) | UNIQUE, NOT NULL | — |
| password_hash | VARCHAR(255) | NOT NULL | — |
| role | user_role | NOT NULL | `'elder'` |
| first_name | VARCHAR(100) | NOT NULL | — |
| last_name | VARCHAR(100) | NOT NULL | `''` |
| phone_number | VARCHAR(20) | — | — |
| needs_mobility | BOOLEAN | — | `false` |
| needs_vision | BOOLEAN | — | `false` |
| onboarding_complete | BOOLEAN | — | `false` |
| created_at | TIMESTAMPTZ | — | `CURRENT_TIMESTAMP` |

**Constraints:**
- `users_pkey` — PRIMARY KEY (`id`)
- `users_email_key` — UNIQUE (`email`)

---

### `products`
Product listings on the marketplace. `is_verified` flags products that meet elderly-friendly standards (Verified Product Badge).

| Column | Type | Constraints | Default |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | — |
| seller_id | INTEGER | FK → users(id) ON DELETE CASCADE | — |
| title | VARCHAR(255) | NOT NULL | — |
| description | TEXT | — | — |
| price | NUMERIC(10,2) | NOT NULL | — |
| stock_quantity | INTEGER | NOT NULL | `0` |
| is_verified | BOOLEAN | — | `false` |
| image | VARCHAR(255) | — | — |
| created_at | TIMESTAMPTZ | — | `CURRENT_TIMESTAMP` |

**Constraints:**
- `products_pkey` — PRIMARY KEY (`id`)
- `products_seller_id_fkey` — FOREIGN KEY (`seller_id`) → `users(id)` ON DELETE CASCADE

---

### `product_needs`
Junction table linking products to one or more accessibility need categories. Supports the Search by Need filter feature.

| Column | Type | Constraints |
|---|---|---|
| product_id | INTEGER | PK, FK → products(id) ON DELETE CASCADE |
| need | accessibility_need | PK |

**Constraints:**
- `product_needs_pkey` — PRIMARY KEY (`product_id`, `need`)
- `product_needs_product_id_fkey` — FOREIGN KEY (`product_id`) → `products(id)` ON DELETE CASCADE

---

### `orders`
A placed order by a buyer. `recipient_id` supports the caregiver flow where a helper purchases on behalf of an elder.

| Column | Type | Constraints | Default |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | — |
| buyer_id | INTEGER | FK → users(id) | — |
| recipient_id | INTEGER | FK → users(id) | — |
| total_amount | NUMERIC(10,2) | NOT NULL | — |
| status | VARCHAR(50) | — | `'pending'` |
| created_at | TIMESTAMPTZ | — | `CURRENT_TIMESTAMP` |

**Constraints:**
- `orders_pkey` — PRIMARY KEY (`id`)
- `orders_buyer_id_fkey` — FOREIGN KEY (`buyer_id`) → `users(id)`
- `orders_recipient_id_fkey` — FOREIGN KEY (`recipient_id`) → `users(id)`

---

### `order_items`
Individual line items within an order. `price_at_purchase` captures the price at the time of checkout so price changes don't affect historical orders.

| Column | Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| order_id | INTEGER | FK → orders(id) ON DELETE CASCADE |
| product_id | INTEGER | FK → products(id) |
| quantity | INTEGER | NOT NULL |
| price_at_purchase | NUMERIC(10,2) | NOT NULL |

**Constraints:**
- `order_items_pkey` — PRIMARY KEY (`id`)
- `order_items_order_id_fkey` — FOREIGN KEY (`order_id`) → `orders(id)` ON DELETE CASCADE
- `order_items_product_id_fkey` — FOREIGN KEY (`product_id`) → `products(id)`

---

### `cart_items`
Active cart for a logged-in user. The UNIQUE constraint on `(user_id, product_id)` prevents duplicate entries — quantity is updated instead.

| Column | Type | Constraints | Default |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | — |
| user_id | INTEGER | FK → users(id) ON DELETE CASCADE | — |
| product_id | INTEGER | FK → products(id) ON DELETE CASCADE | — |
| quantity | INTEGER | NOT NULL | `1` |

**Constraints:**
- `cart_items_pkey` — PRIMARY KEY (`id`)
- `cart_items_user_id_product_id_key` — UNIQUE (`user_id`, `product_id`)
- `cart_items_user_id_fkey` — FOREIGN KEY (`user_id`) → `users(id)` ON DELETE CASCADE
- `cart_items_product_id_fkey` — FOREIGN KEY (`product_id`) → `products(id)` ON DELETE CASCADE

---

### `wishlists`
Saved products per user. The UNIQUE constraint on `(user_id, product_id)` prevents the same product being saved twice.

| Column | Type | Constraints | Default |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | — |
| user_id | INTEGER | FK → users(id) ON DELETE CASCADE | — |
| product_id | INTEGER | FK → products(id) ON DELETE CASCADE | — |
| created_at | TIMESTAMPTZ | — | `CURRENT_TIMESTAMP` |

**Constraints:**
- `wishlists_pkey` — PRIMARY KEY (`id`)
- `wishlists_user_id_product_id_key` — UNIQUE (`user_id`, `product_id`)
- `wishlists_user_id_fkey` — FOREIGN KEY (`user_id`) → `users(id)` ON DELETE CASCADE
- `wishlists_product_id_fkey` — FOREIGN KEY (`product_id`) → `products(id)` ON DELETE CASCADE

---

### `user_links`
Caregiver/family linking. An elder (`elder_id`) is linked to a helper (`helper_id`). Status flows from `pending` → `accepted` or `rejected`.

| Column | Type | Constraints | Default |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | — |
| elder_id | INTEGER | NOT NULL, FK → users(id) | — |
| helper_id | INTEGER | NOT NULL, FK → users(id) | — |
| relationship | VARCHAR(50) | NOT NULL | `'family'` |
| status | VARCHAR(50) | NOT NULL | `'pending'` |
| created_at | TIMESTAMPTZ | — | `now()` |

**Constraints:**
- `user_links_pkey` — PRIMARY KEY (`id`)
- `user_links_elder_id_fkey` — FOREIGN KEY (`elder_id`) → `users(id)`
- `user_links_helper_id_fkey` — FOREIGN KEY (`helper_id`) → `users(id)`

---

### `reviews`
Product reviews left by users. Rating is validated between 1–5 via a CHECK constraint. If a user is deleted, their reviews are retained with `user_id` set to NULL.

| Column | Type | Constraints | Default |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | — |
| user_id | INTEGER | FK → users(id) ON DELETE SET NULL | — |
| product_id | INTEGER | FK → products(id) ON DELETE CASCADE | — |
| rating | INTEGER | CHECK (1–5) | — |
| comment | TEXT | — | — |
| created_at | TIMESTAMPTZ | — | `CURRENT_TIMESTAMP` |

**Constraints:**
- `reviews_pkey` — PRIMARY KEY (`id`)
- `reviews_rating_check` — CHECK (`rating >= 1 AND rating <= 5`)
- `reviews_user_id_fkey` — FOREIGN KEY (`user_id`) → `users(id)` ON DELETE SET NULL
- `reviews_product_id_fkey` — FOREIGN KEY (`product_id`) → `products(id)` ON DELETE CASCADE

---

## Relationships Overview

```
users ──< orders (buyer_id)
users ──< orders (recipient_id)        ← caregiver purchasing on behalf of elder
orders ──< order_items ──> products
users ──< cart_items ──> products
users ──< wishlists ──> products
users ──< reviews ──> products
products ──< product_needs             ← accessibility need categories
users ──< user_links (elder_id)        ← caregiver linking
users ──< user_links (helper_id)
```