from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import hashlib

app = Flask(__name__)
CORS(app)

# File path to store user data
USER_DATA_FILE = 'users.json'

# Load existing user data from the file
try:
    with open(USER_DATA_FILE, 'r') as file:
        users = json.load(file)
except FileNotFoundError:
    users = []

# Endpoint to handle user creation and verification
@app.route('/api/create_user', methods=['POST'])
def create_user():
    # Get user data from the request
    user_data = request.json
    name = user_data.get('name')
    email = user_data.get('email')
    password = user_data.get('password')

    # Check if user already exists
    existing_user = next((user for user in users if user['email'] == email), None)
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # If user does not exist, add to the database
    users.append({'name': name, 'email': email, 'password': hashed_password})

    # Write updated user data to the file
    with open(USER_DATA_FILE, 'w') as file:
        json.dump(users, file, indent=4)

    return jsonify({'message': 'Account created successfully'}), 201

# Endpoint to handle user creation and verification
@app.route('/api/verifyuser', methods=['POST'])
def verify_user():
    # Get user data from the request
    user_data = request.json
    name = user_data.get('name')
    password = user_data.get('password')

    # Find the user with the given name
    user = next((user for user in users if user['name'] == name), None)
    if user:
        # Hash the provided password and compare with the stored hashed password
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        if user['password'] == hashed_password:
            return jsonify({'message': 'User authenticated successfully'}), 200
        else:
            return jsonify({'message': 'Invalid password'}), 401
    else:
        return jsonify({'message': 'User not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)
