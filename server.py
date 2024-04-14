from flask import Flask, send_file, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/make_predictions', methods=['POST', 'OPTIONS'])
def make_predictions():
    if 'image' not in request.files:
        print("no image in request files")
        return jsonify({'error': 'No image part'})

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        print("image about to upload")
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))


        # TODO run model and save output to upload folder, and update the filename variable

        filename = "cars.jpeg"
        predicted_image = f'http://localhost:5000/get_prediction/{filename}'

        response_data = {
            'message': 'Image uploaded successfully',
            'predicted_image': predicted_image,
            'textData': "you are a farmer hahah!!"
        }

    return jsonify(response_data)

@app.route('/get_prediction/<image_path>', methods=['GET', 'OPTIONS'])
def get_prediction(image_path):
    return send_file(f"/home/anshul/Desktop/WeedDetection/uploads/{image_path}", mimetype='image/jpeg')



if __name__ == '__main__':
    app.run(debug=True)