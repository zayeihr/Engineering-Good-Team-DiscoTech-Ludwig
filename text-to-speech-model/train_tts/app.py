from flask import Flask, request, jsonify
import torch

app = Flask(__name__)

@app.route('/train_tts', methods=['POST'])
def train_tts():
    # Placeholder to execute the training logic
    # Here you would import and call your training function
    # Assuming you have a function called `train_model` that handles the training process

    from your_training_module import train_model
    config_path = request.json['config_path']
    train_model(config_path)
    return jsonify({"status": "success", "message": "Training started"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
