from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

@app.route("/api/health")
def health():
    return {"status": "ok", "message": "Flask is running"}

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)