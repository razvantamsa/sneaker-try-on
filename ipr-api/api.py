import json
from flask import Flask
app = Flask(__name__)

@app.route('/healthcheck', methods=['GET'])
def healthcheck():
    return json.dumps({'response': 'IPR Service working...'})

@app.route('/ipr/verify-stance', methods=['POST'])
def verifyStance():
    return json.dumps({'response': 'IPR Service working...'})

@app.route('/ipr/edit-sneaker', methods=['POST'])
def editSneaker():
    return json.dumps({'response': 'IPR Service working...'})
app.run()