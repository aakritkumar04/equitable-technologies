from flask import Flask, request, jsonify, send_from_directory
import pymongo
from urllib.parse import quote_plus
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from jose import JWTError, jwt
from pydantic import BaseModel
from functools import wraps
from bson import ObjectId
from dotenv import load_dotenv
import uuid
import os
from werkzeug.utils import secure_filename
load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app) 
username = os.getenv("USERNAME")
password = os.getenv("PASSWORD")
secret_key = os.getenv("SECRET_KEY")
algorithm = os.getenv("ALGORITHM")
username = quote_plus(username)
password = quote_plus(password)
connection_uri = f"mongodb+srv://{username}:{password}@cluster0.f0nwvri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(connection_uri)

try:
    db_names = client.list_database_names()
    print("Connection is active.")
except pymongo.errors.ServerSelectionTimeoutError:
    print("Connection is not active.")

db = client["mainDb"]
user_collection = db["userData"]
image_collection = db["imgData"]


class User:
    def __init__(self, name, password, email, id):
        self.name = name
        self.password = password
        self.email = email
        self.id = id

    def to_dict(self):
        return {
            "name": self.name,
            "password": self.password,
            "email": self.email,
            "id": self.id
        }


class Image:
    def __init__(self, filename, classification, annotated, user):
        self.classification = classification
        self.filename = filename
        self.annotated = annotated
        self.user = user

    def to_dict(self):
        return {
            "classification": self.classification,
            "filename": self.filename,
            "annotated": self.annotated,
            "user": self.user
        }
    

    
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            data = jwt.decode(token, secret_key)
            current_user = user_collection.find_one({"id":data["id"]})
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        return  f(current_user, *args, **kwargs)
  
    return decorated

@app.route("/signup",methods=["POST"])
def signup():
    try:
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data["password"]).decode('utf-8') 
        user_id = uuid.uuid4()
        user_id = str(user_id)
        new_user = User(
            name = data["name"],
            id = user_id,
            email = data["email"],
            password=hashed_password
        )
        user_data = new_user.to_dict()
        result = user_collection.insert_one(user_data)
        return  jsonify({"is_successful":True,'message': f'User {data["name"]} created successfully','id':user_id})
    except Exception as e:
        print(e)
        return  jsonify({"is_successful":False,'message': e})
    


@app.route("/login",methods=["POST"])
def login():
    try:
        data = request.get_json()
        # print(data["id"])
        user_data = user_collection.find_one({"id":data["id"]})
        if user_data:
            is_valid = bcrypt.check_password_hash(user_data["password"],data["password"]) 
            if is_valid:
                storedData = {
                        'id': user_data["id"],
                        'name': user_data["name"]
                    }
                token = jwt.encode(
                    storedData,
                    secret_key,
                    algorithm
                )
                return jsonify({"is_successful":True,'token': token, "messages":1})
            else:
                return jsonify({"is_successful":False, "messages":12})
        else:
            return jsonify({"is_successful":False,"messages":13})
    except Exception as e:
        print(e)
        return  jsonify({"is_successful":False,'error': e})
    

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def create_upload_folder(id, classification):
    upload_folder = os.path.join(app.config['UPLOAD_FOLDER'], id, classification)
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    return upload_folder

@app.route('/upload', methods=['POST'])
@token_required
def upload_file(curr_user):
    try:
        id = curr_user["id"]
        classification = request.form["classification"]
        upload_folder = create_upload_folder(id, classification)

        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)

        new_image = Image(
            filename=filename,
            classification=classification,
            annotated=1,
            user=id
        )
        image_doc = new_image.to_dict()
        image_collection.insert_one(image_doc)

        return jsonify({'fileName': filename}), 200

    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_images', methods=['GET'])
@token_required
def get_images(curr_user):
    id = curr_user["id"]
    image_folder = os.path.join("uploads", id)

    image_files = []
    for root, dirs, files in os.walk(image_folder):
        for file in files:
            if file.endswith(".png") or file.endswith(".jpg") or file.endswith(".jpeg"):
                image_files.append(os.path.join(root, file))

    return jsonify({'images': image_files})


@app.route('/uploads/<path:filename>',methods=["GET"])
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/get_updated_classification',methods=["POST"])
@token_required
def get_updated_classification(curr_user):
    try:
        filename = request.form["filename"]
        found = list(image_collection.find({"$and": [{"filename": filename}, {"user": curr_user["id"]}]}))
        if found:
            return jsonify({"is_successful":True,"classification":found[0]["classification"]})
    except Exception as e:
        return jsonify({"is_successful":False,"error":e})


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port="5030")