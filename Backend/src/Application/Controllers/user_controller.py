from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from src.config.data_base import db
from src.Infrastructure.Model.user import User

user_bp = Blueprint('user', __name__, url_prefix='/api/users')

# 📌 Registrar usuário
@user_bp.route('', methods=['POST'])
def register_user():
    data = request.json

    if not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Nome, e-mail e senha são obrigatórios."}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "Já existe um usuário com este e-mail."}), 400

    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,
        status='Ativo'
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

# 📌 Listar usuários
@user_bp.route('/', methods=['GET'])
def listar_usuarios():
    users = User.query.all()
    users_list = [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "status": u.status
    } for u in users]

    return jsonify(users_list), 200

# 📌 Buscar usuário por ID
@user_bp.route('/<int:id>', methods=['GET'])
def buscar_usuario(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "status": user.status
    }), 200

# 📌 Atualizar usuário
@user_bp.route('/<int:id>', methods=['PUT'])
def atualizar_usuario(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    data = request.json
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    if data.get("password"):
        user.password = generate_password_hash(data["password"])

    db.session.commit()
    return jsonify({"message": f"Usuário '{user.name}' atualizado com sucesso!"}), 200

# 📌 Excluir usuário
@user_bp.route('/<int:id>', methods=['DELETE'])
def excluir_usuario(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"Usuário '{user.name}' excluído com sucesso!"}), 200
