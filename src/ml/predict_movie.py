import os
import sys
import json
import joblib
import pandas as pd

# Absolute path to model file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "movie_model.pkl")

# Load model
model = joblib.load(MODEL_PATH)

# Parse input JSON
data = json.loads(sys.argv[1])
df = pd.DataFrame([data])
df.head()

# Predict
prediction = model.predict(df)[0]
print(json.dumps({"predicted_revenue": int(prediction)}))
