from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore
import datetime

app = Flask(__name__)
CORS(app)  

session_data = {"active_sessions": 0}

@app.route('/')
def home():
    """Health check for the server."""
    return jsonify({"message": "Welcome to the Air Break Backend!"})

@app.route('/api/start_timer', methods=['POST'])
def start_timer():
    """API endpoint to start a focus timer."""
    data = request.json
    focus_time = data.get("focus_time", "00:25:00")
    session_data["active_sessions"] += 1

    return jsonify({
        "message": "Focus timer started!",
        "focus_time": focus_time,
        "active_sessions": session_data["active_sessions"]
    })

@app.route('/api/get_motivation', methods=['GET'])
def get_motivation():
    """API endpoint to fetch a motivational quote."""
    quotes = [
        "Believe in yourself and all that you are!",
        "Stay positive, work hard, make it happen!",
        "You can do anything you set your mind to!"
    ]
    current_time = datetime.datetime.now()
    selected_quote = quotes[current_time.second % len(quotes)]  # Rotate quotes

    return jsonify({"quote": selected_quote})

@app.route('/api/end_session', methods=['POST'])
def end_session():
    """API endpoint to end a session."""
    if session_data["active_sessions"] > 0:
        session_data["active_sessions"] -= 1

    return jsonify({
        "message": "Session ended!",
        "active_sessions": session_data["active_sessions"]
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
