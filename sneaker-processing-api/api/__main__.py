import json
import numpy as np
from PIL import Image
from flask import Flask, send_file, request
from api.functions.verify_stance import verify_stance 

app = Flask(__name__)

@app.route('/healthcheck', methods=['GET'])
def healthcheck():
    return json.dumps({'response': 'IPR Service working...'})

@app.route('/ipr/verify-stance', methods=['POST'])
def verify_stance_endpoint():
    try:
        image_bytes = request.files['file'].read()
        converted_image = verify_stance(image_bytes)
        return np.array2string(converted_image)
    except Exception as e:
        return json.dumps({'error': str(e)})

@app.route('/ipr/edit-sneaker', methods=['POST'])
def edit_sneaker_endpoint():
    return json.dumps({'response': 'IPR Service working...'})

def main():
    while True:
        app.run(port=5001)

if __name__ == "__main__":
    main()