import pickle
import numpy as np
import json
import sys
import os
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'crop_model_bundle.pkl')

try:
    with open(MODEL_PATH, 'rb') as f:
        model_bundle = pickle.load(f)
    
    model = model_bundle.get('model') or model_bundle.get('classifier')
    scaler = model_bundle.get('scaler') or model_bundle.get('StandardScaler')
    label_encoder = model_bundle.get('label_encoder') or model_bundle.get('LabelEncoder')
    
    if not all([model, scaler, label_encoder]):
        raise ValueError("Model bundle incomplete. Required: model, scaler, label_encoder")
        
except Exception as e:
    print(json.dumps({
        'status': 'error',
        'message': f'Error loading model: {str(e)}'
    }))
    sys.exit(1)

def predict_crop(data):
    try:
        # Prepare features
        features = np.array([[
            float(data['N']),
            float(data['P']),
            float(data['K']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['pH']),
            float(data['rainfall'])
        ]])

        # Scale features
        features_scaled = scaler.transform(features)

        # Predict
        prediction = model.predict(features_scaled)
        prediction_proba = model.predict_proba(features_scaled)

        # Get top 5 predictions
        top_indices = np.argsort(prediction_proba[0])[::-1][:5]
        top_crops = []
        
        for idx in top_indices:
            crop_name = label_encoder.inverse_transform([idx])[0]
            probability = float(prediction_proba[0][idx])
            top_crops.append({
                'crop': crop_name,
                'probability': round(probability * 100, 2)
            })

        # Main prediction
        predicted_crop = label_encoder.inverse_transform(prediction)[0]

        result = {
            'status': 'success',
            'data': {
                'prediction': predicted_crop,
                'confidence': round(float(prediction_proba[0][prediction[0]]) * 100, 2),
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
