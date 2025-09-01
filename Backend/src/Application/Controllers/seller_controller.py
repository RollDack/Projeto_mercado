from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from src.config.data_base import db
from src.Infrastructure.Model.seller import Seller

seller_bp = Blueprint("seller_controller", __name__, url_prefix="/api/sellers")

# 📌 Cadastrar seller
@seller_bp.route("", methods=["POST"])
def create_seller():
    data = request.json
    required_fields = ['name', 'cnpj', 'email', 'celular', 'password']

    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"O campo '{field}' é obrigatório."}), 400

    existing = Seller.query.filter(
        (Seller.email == data["email"]) | (Seller.cnpj == data["cnpj"])
    ).first()

    if existing:
        return jsonify({"message": "Já existe um seller cadastrado com este e-mail ou CNPJ."}), 400

    new_seller = Seller(
        name=data["name"],
        cnpj=data["cnpj"],
        email=data["email"],
        celular=data["celular"],
        password=generate_password_hash(data["password"]),
        status="Ativo"  # já cadastra ativo
    )

    db.session.add(new_seller)
    db.session.commit()

    return jsonify({"message": "Seller cadastrado com sucesso!"}), 201

# 📌 Listar sellers
@seller_bp.route("/", methods=["GET"])
def listar_sellers():
    sellers = Seller.query.all()
    sellers_list = [{
        "id": s.id,
        "name": s.name,
        "cnpj": s.cnpj,
        "email": s.email,
        "celular": s.celular,
        "status": s.status
    } for s in sellers]

    return jsonify(sellers_list), 200

# 📌 Buscar seller por ID
@seller_bp.route("/<int:id>", methods=["GET"])
def buscar_seller(id):
    seller = Seller.query.get(id)
    if not seller:
        return jsonify({"message": "Seller não encontrado."}), 404

    return jsonify({
        "id": seller.id,
        "name": seller.name,
        "cnpj": seller.cnpj,
        "email": seller.email,
        "celular": seller.celular,
        "status": seller.status
    }), 200

# 📌 Atualizar seller
@seller_bp.route("/<int:id>", methods=["PUT"])
def atualizar_seller(id):
    seller = Seller.query.get(id)
    if not seller:
        return jsonify({"message": "Seller não encontrado."}), 404

    data = request.json
    seller.name = data.get("name", seller.name)
    seller.cnpj = data.get("cnpj", seller.cnpj)
    seller.email = data.get("email", seller.email)
    seller.celular = data.get("celular", seller.celular)
    if data.get("password"):
        seller.password = generate_password_hash(data["password"])

    db.session.commit()
    return jsonify({"message": f"Seller '{seller.name}' atualizado com sucesso!"}), 200

# 📌 Excluir seller
@seller_bp.route("/<int:id>", methods=["DELETE"])
def excluir_seller(id):
    seller = Seller.query.get(id)
    if not seller:
        return jsonify({"message": "Seller não encontrado."}), 404

    db.session.delete(seller)
    db.session.commit()
    return jsonify({"message": f"Seller '{seller.name}' excluído com sucesso!"}), 200
