from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from src.config.data_base import db
from src.Infrastructure.Model.user import User

user_bp = Blueprint('user', __name__, url_prefix='/api/users')

# 📌 Registrar usuário
@user_bp.route('', methods=['POST'])
def register_user():
    data = request.json

    # Validação dos campos obrigatórios
    required_fields = ['name', 'email', 'celular', 'password', 'cpf']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"O campo '{field}' é obrigatório."}), 400

    # Verifica duplicidade de email
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Já existe um usuário com este e-mail."}), 400

    # Verifica duplicidade de CPF
    if User.query.filter_by(cpf=data['cpf']).first():
        return jsonify({"message": "Já existe um usuário com este CPF."}), 400

    # Gera hash da senha
    hashed_password = generate_password_hash(data['password'])

    # Cria novo usuário
    new_user = User(
        name=data['name'],
        email=data['email'],
        celular=data['celular'],
        password=hashed_password,
        cpf=data['cpf'],
        status='Ativo'
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

# 📌 Login de usuário
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "E-mail ou senha incorretos."}), 401

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "status": user.status
    }), 200

# 📌 Listar usuários
@user_bp.route('/', methods=['GET'])
def listar_usuarios():
    users = User.query.all()
    users_list = [{
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "celular": u.celular,
        "cpf": u.cpf,
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