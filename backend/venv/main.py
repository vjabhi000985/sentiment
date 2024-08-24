from flask import Flask
from flask_cors import CORS # type: ignore

app = Flask(__main__) # type: ignore
CORS(app)

@app.route("/prediction")
def predict():
    pass

if __name__ == '__main__':
    app.run(debug=True)