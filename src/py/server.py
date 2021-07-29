from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources=r'/*')

@app.route('/', methods = ['POST', 'GET'])
def add():
    if request.method == 'POST':
        content = request.json
        if (content):
            numOne = content['numOne']
            numTwo = content['numTwo']
            return jsonify({"result": (numOne + numTwo)})
        else:
            return jsonify({"result": "content"})


if __name__ == '__main__':
    app.run(debug=True, port=8000)