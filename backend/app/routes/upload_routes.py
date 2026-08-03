import os
from flask import Blueprint, request, jsonify, current_app
try:
    from flask_jwt_extended import jwt_required, get_jwt_identity
except ImportError:
    def jwt_required(*args, **kwargs):
        def decorator(fn): return fn
        return decorator
    def get_jwt_identity(): return "dummy_user_id"

from werkzeug.utils import secure_filename
from datetime import datetime

upload_bp = Blueprint('upload_bp', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf', 'csv', 'xlsx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        timestamp = int(datetime.utcnow().timestamp())
        saved_filename = f"{timestamp}_{filename}"

        upload_dir = current_app.config.get("UPLOAD_FOLDER", "./uploads")
        os.makedirs(upload_dir, exist_ok=True)
        filepath = os.path.join(upload_dir, saved_filename)
        file.save(filepath)

        return jsonify({
            "message": "File uploaded successfully",
            "filename": saved_filename,
            "original_name": filename,
            "path": filepath
        }), 201

    return jsonify({"error": "File type not allowed"}), 400
