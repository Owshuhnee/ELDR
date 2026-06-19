# RUN
# Entry point for starting the Flask development server

# ─── IMPORTS ──────────────────────────────────────────────────────────────────
from app import app, socketio


# ─── SERVER ───────────────────────────────────────────────────────────────────
# __name__ == "__main__" means this only runs when you execute run.py directly
# It won't run if another file imports from this one
if __name__ == "__main__":
    # debug=True auto-reloads the server when you save a file — development only
    # Never run debug=True in production — it exposes sensitive error information
    socketio.run(app, debug=True, port=5000)