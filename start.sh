#!/bin/bash

# Exit on errors
set -e

# Step 1: Create and activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Step 2: Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Step 3: Install Node.js dependencies
npm install

# Step 4: Start the Node.js server (adjust the path if needed)
node index.js
