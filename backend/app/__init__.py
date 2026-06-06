# This is where the app lives and gets configured

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
bcrypt = Bcrypt(app)

@app.route("/api/health")
def health():
    return {"status": "ok", "message": "Flask is running"}

from app.routes.auth import auth_bp
app.register_blueprint(auth_bp)

from app.routes.onboarding import onboarding_bp
app.register_blueprint(onboarding_bp)