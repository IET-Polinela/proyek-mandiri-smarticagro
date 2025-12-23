import sys
import json
import pickle
import numpy as np
import os

def load_model():
    """Load the crop prediction model"""
    model_path = os.path.join(os.path.dirname(__file__), 'crop_model_bundle.pkl')
    
    try:
        with open(model_path, 'rb') as f:
            model_bundle = pickle.load(f)
        return model_bundle
    except Exception as e:
        print(json.dumps({
            'status': 'error',
            'message': f'Error loading model: {str(e)}'
        }))
        sys.exit(1)

def predict_crop(data):
    """Predict crop based on sensor data"""
    try:
        model_bundle = load_model()
        
        # Extract model and label encoder
        model = model_bundle.get('model')
        label_encoder = model_bundle.get('label_encoder')
        scaler = model_bundle.get('scaler', None)
        
        if model is None:
            raise Exception('Model not found in bundle')
        
        # Prepare input features
        # Order: N, P, K, temperature, humidity, pH, rainfall (or EC)
        features = [
            float(data.get('N', 0)),
            float(data.get('P', 0)),
            float(data.get('K', 0)),
            float(data.get('temperature', 0)),
            float(data.get('humidity', 0)),
            float(data.get('pH', 0)),
            float(data.get('rainfall', data.get('ec', 0)))  # Use EC if rainfall not provided
        ]
        
        # Convert to numpy array
        X = np.array([features])
        
        # Apply scaling if scaler exists
        if scaler is not None:
            X = scaler.transform(X)
        
        # Predict
        prediction = model.predict(X)
        
        # Get probabilities if available
        probabilities = None
        top_crops = []
        
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba(X)[0]
            
            # Get top 3 crops with probabilities
            top_indices = np.argsort(proba)[::-1][:3]
            
            for idx in top_indices:
                crop_name = label_encoder.inverse_transform([idx])[0] if label_encoder else str(idx)
                confidence = float(proba[idx] * 100)
                
                top_crops.append({
                    'crop': crop_name,
                    'confidence': round(confidence, 2)
                })
        
        # Get predicted crop name
        predicted_crop = label_encoder.inverse_transform(prediction)[0] if label_encoder else str(prediction[0])
        
        result = {
            'status': 'success',
            'data': {
                'predicted_crop': predicted_crop,
                'top_crops': top_crops if top_crops else [{'crop': predicted_crop, 'confidence': 100}],
                'input_features': {
                    'N': features[0],
                    'P': features[1],
                    'K': features[2],
                    'temperature': features[3],
                    'humidity': features[4],
                    'pH': features[5],
                    'rainfall': features[6]
                }
            }
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({
            'status': 'error',
            'message': f'Prediction error: {str(e)}'
        }))
        sys.exit(1)

if __name__ == '__main__':
    try:
        # Read input from stdin
        input_data = json.loads(sys.stdin.read())
        predict_crop(input_data)
    except Exception as e:
        print(json.dumps({
            'status': 'error',
            'message': f'Input error: {str(e)}'
        }))
        sys.exit(1)
