from flask import Flask, jsonify, request
import pandas as pd
from datetime import datetime
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Data for phone models with weights and initial prices
model_data = {
    "brand": ["Samsung", "Samsung", "Samsung", "Samsung", "Samsung",
              "Apple", "Apple", "Apple", "Apple", "Apple",
              "Xiaomi", "Xiaomi", "Xiaomi", "Xiaomi", "Xiaomi",
              "OnePlus", "OnePlus", "OnePlus", "OnePlus", "OnePlus",
              "Realme", "Realme", "Realme", "Realme", "Realme",
              "Vivo", "Vivo", "Vivo", "Vivo", "Vivo",
              "OPPO", "OPPO", "OPPO", "OPPO", "OPPO",
              "Nokia", "Nokia", "Nokia", "Nokia", "Nokia",
              "Motorola", "Motorola", "Motorola", "Motorola", "Motorola"],
    
    "model": ["Galaxy S21", "Galaxy S20", "Galaxy Note 20", "Galaxy A52", "Galaxy M32",
              "iPhone 13", "iPhone 12", "iPhone SE", "iPhone 11", "iPhone XR",
              "Redmi Note 10", "Mi 11X", "Poco X3", "Redmi 9", "Mi 10T",
              "OnePlus 9 Pro", "OnePlus 9", "OnePlus 8T", "OnePlus Nord", "OnePlus 8",
              "Realme 8 Pro", "Realme Narzo 30 Pro", "Realme 7", "Realme C11", "Realme X7 Max",
              "Vivo V21", "Vivo Y73", "Vivo X60 Pro", "Vivo S1 Pro", "Vivo Y20G",
              "OPPO F19 Pro", "OPPO Reno 5 Pro", "OPPO A74", "OPPO A53", "OPPO Find X3 Pro",
              "Nokia 5.4", "Nokia 3.4", "Nokia 8.3", "Nokia 2.4", "Nokia 7.2",
              "Moto G60", "Moto G40 Fusion", "Moto G30", "Moto G9 Power", "Moto E7 Power"],
    
    "launch_date": ["2021-01-29", "2020-03-06", "2020-08-21", "2021-03-17", "2021-07-21",
                    "2021-09-24", "2020-10-23", "2020-04-24", "2019-09-20", "2018-10-26",
                    "2021-03-16", "2021-04-23", "2020-09-22", "2020-07-31", "2020-10-30",
                    "2021-03-23", "2021-03-16", "2020-10-14", "2020-07-21", "2020-04-14",
                    "2021-03-24", "2021-05-18", "2020-09-01", "2020-06-30", "2021-05-31",
                    "2021-05-15", "2021-06-10", "2021-01-19", "2020-08-06", "2020-10-12",
                    "2020-12-15", "2020-10-25", "2020-06-24", "2020-09-21", "2020-06-03",
                    "2021-03-24", "2021-04-23", "2020-07-31", "2020-10-23", "2018-10-26",
                    "2021-04-08", "2021-06-04", "2021-02-16", "2021-03-02", "2021-02-25"],
    
    "initial_price": [69999, 66999, 77999, 26499, 14999,
                      79900, 79900, 42500, 64900, 76900,
                      12499, 29999, 16999, 8999, 35999,
                      64999, 49999, 42999, 24999, 34999,
                      27999, 18999, 15999, 7999, 24999,
                      29999, 24999, 34999, 19999, 15999,
                      19999, 24999, 16999, 10999, 19999,
                      18999, 15999, 12999, 14999, 11999,
                      19999, 14999, 17999, 17999, 14999],
    
    "weight": [0.169, 0.163, 0.208, 0.189, 0.196,  # Samsung weights (in kg)
               0.173, 0.164, 0.148, 0.194, 0.194,  # Apple weights
               0.179, 0.196, 0.225, 0.196, 0.216,  # Xiaomi weights
               0.197, 0.193, 0.188, 0.184, 0.180,  # OnePlus weights
               0.176, 0.194, 0.196, 0.196, 0.180,  # Realme weights
               0.176, 0.170, 0.179, 0.186, 0.192,  # Vivo weights
               0.173, 0.175, 0.190, 0.186, 0.193,  # OPPO weights
               0.180, 0.178, 0.227, 0.195, 0.180,  # Nokia weights
               0.225, 0.225, 0.207, 0.221, 0.200]  # Motorola weights
}

# Convert data into a DataFrame
df = pd.DataFrame(model_data)
df['launch_date'] = pd.to_datetime(df['launch_date'])

# Function to calculate the CO2 saved based on weight
def calculate_co2_saved(weight):
    # Assuming 1 kg of e-waste recycled saves 1.42 kg of CO2
    co2_saved = weight * 1.42
    return round(co2_saved, 2)

# Function to train the model
def train_model():
    current_date = datetime.now()
    df['days_since_launch'] = (current_date - df['launch_date']).dt.days

    X = df[['days_since_launch']]
    y = df['initial_price']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    return model

# API route to predict the price of a phone model
@app.route('/predict', methods=['POST'])
def predict_price():
    data = request.json
    launch_date = data['launch_date']

    # Calculate days since launch
    current_date = datetime.now()
    new_model_launch_date = datetime.strptime(launch_date, '%Y-%m-%d')
    days_since_launch = (current_date - new_model_launch_date).days

    # Train the model
    model = train_model()

    # Predict the price
    predicted_price = model.predict([[days_since_launch]])
    return jsonify({"predicted_price": round(predicted_price[0], 2)})

# API route to calculate the CO2 saved for recycled items
@app.route('/calculate_co2', methods=['POST'])
def calculate_co2():
    data = request.json
    total_waste_recycled = data.get('total_waste_recycled', 0)  # Total waste recycled in kg

    # Calculate total CO2 saved
    total_co2_saved = calculate_co2_saved(total_waste_recycled)

    return jsonify({
        "total_waste_recycled": total_waste_recycled,
        "total_co2_saved": total_co2_saved
    })

if __name__ == '__main__':
    app.run(debug=True)
