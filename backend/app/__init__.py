# This is where the app lives and gets configured

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
bcrypt = Bcrypt(app)

# Session config
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

@app.route("/api/health")
def health():
    return {"status": "ok", "message": "Flask is running"}

from app.routes.auth import auth_bp
app.register_blueprint(auth_bp)