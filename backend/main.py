from flask import Flask, jsonify, request
from flask_cors import CORS # type: ignore
import joblib

app = Flask(__name__) # type: ignore
CORS(app)

# Load your pre-trained models (replace with your actual paths)
model = joblib.load('models/model_v2.pkl')
vectorizer = joblib.load('models/vectorizer_v2.pkl')

@app.route("/prediction", methods=['POST'])
def predict():
    review_text = request.json['reviewText']
    new_review_features = vectorizer.transform([review_text]).toarray()
    prediction = model.predict(new_review_features)[0]

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)