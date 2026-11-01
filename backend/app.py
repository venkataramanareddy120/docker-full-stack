from flask import Flask, jsonify, request

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify({"status": "backend healthy"}), 200

@app.post("/submit")
def submit():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({
            "success": False,
            "message": "Please provide name, email, and message."
        }), 400

    # Assignment processing example. No database is used in this project.
    print(f"Received form submission: name={name}, email={email}, message={message}")

    return jsonify({
        "success": True,
        "message": f"Thank you, {name}! Your message was received by Flask."
    }), 200

if __name__ == "__main__":
    # 0.0.0.0 makes Flask reachable from the other container.
    app.run(host="0.0.0.0", port=5000)
