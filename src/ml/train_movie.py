# /backend/ml/train_movie.py

import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

# Load CSV data
df = pd.read_csv("movie_data.csv")  # Make sure the file exists in this directory

# Rename columns for model compatibility
df.rename(columns={
    "Budget(INR)": "Budget_INR",
    "Revenue(INR)": "Revenue_INR"
}, inplace=True)

# Drop missing values
df.dropna(inplace=True)

# Features and Target
X = df.drop(columns=["Revenue_INR", "Movie_Name", "Lead_Star", "Director", "Music_Director"])
y = df["Revenue_INR"]

# Categorical and numeric columns
categorical_cols = ["Release_Period", "Whether_Remake", "Whether_Franchise", "Genre", "New_Actor", "New_Director", "New_Music_Director"]
numeric_cols = ["Number_of_Screens", "Budget_INR"]

# Preprocessing and model pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
    ],
    remainder="passthrough"  # numeric columns
)

model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", LinearRegression())
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)

print(f"\n📊 Model Evaluation:")
print(f"R² Score: {r2:.3f}")
print(f"MAE: ₹{mae:,.2f}")
print(f"MSE: ₹{mse:,.2f}")
print(f"RMSE: ₹{rmse:,.2f}\n")

# Save trained model
joblib.dump(model, "movie_model.pkl")
print("✅ Model trained and saved as movie_model.pkl")
