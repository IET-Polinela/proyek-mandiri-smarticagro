from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import numpy as np
import json
import sys
import os
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'crop_model_bundle.joblib')

try:
    model_bundle = joblib.load(MODEL_PATH)
    
    model = model_bundle.get('model') or model_bundle.get('classifier')
    scaler = model_bundle.get('scaler') or model_bundle.get('StandardScaler')
    
    # Check for label_encoder or labels list
    label_encoder = model_bundle.get('label_encoder') or model_bundle.get('LabelEncoder')
    labels = model_bundle.get('labels')
    
    if not all([model, scaler]) or not (label_encoder or labels):
        raise ValueError("Model bundle incomplete. Required: model, scaler, and (label_encoder or labels)")
        
except Exception as e:
    print(json.dumps({
        'status': 'error',
        'message': f'Error loading model: {str(e)}'
    }))
    sys.exit(1)


def predict_crop(data):
    try:
        # Model only uses 6 features: N, P, K, temperature, humidity, ph
        features = np.array([[
            float(data['N']),
            float(data['P']),
            float(data['K']),
            float(data['temperature']),
            float(data['humidity']),
            float(data.get('pH') or data.get('ph'))  # Accept both pH and ph
        ]])

        features_scaled = scaler.transform(features)

        prediction = model.predict(features_scaled)
        prediction_proba = model.predict_proba(features_scaled)

        # Get top 5 crops with highest probability
        top_indices = np.argsort(prediction_proba[0])[::-1][:5]
        top_crops = []

        for idx in top_indices:
            crop_name = labels[idx]
            probability = float(prediction_proba[0][idx])
            top_crops.append({
                'crop': crop_name,
                'probability': round(probability * 100, 2)
            })

        # prediction[0] is already the predicted crop name (string)
        predicted_crop = prediction[0]
        
        # Find the index of predicted crop to get its confidence
        try:
            predicted_idx = labels.index(predicted_crop)
            confidence = round(float(prediction_proba[0][predicted_idx]) * 100, 2)
        except (ValueError, IndexError):
            confidence = round(float(np.max(prediction_proba[0])) * 100, 2)

        result = {
            'status': 'success',
            'data': {
                'prediction': predicted_crop,
                'confidence': confidence,
                'top_crops': top_crops
            }
        }

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({
            'status': 'error',
            'message': str(e)
        }))
        sys.exit(1)


if __name__ == '__main__':
    input_data = json.loads(sys.stdin.read())
    predict_crop(input_data)
