from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
import traceback

from src.config.data_base import db
from src.Infrastructure.Model.product import Product

produto_bp = Blueprint('produto_bp', __name__, url_prefix='/api/produtos')

# Caminho para salvar imagens
UPLOAD_FOLDER = os.path.join(os.getcwd(), "src", "uploads", "imagens_mercado")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 📌 Criar produto
@produto_bp.route('', methods=['POST'])
@produto_bp.route('/', methods=['POST'])
def cadastrar_produto():
    try:
        print("=== DEBUG CADASTRAR PRODUTO ===")
        print("Form recebido:", request.form)
        print("Files recebidos:", request.files)

        nome = request.form.get('nome')
        preco_str = request.form.get('preco')
        quantidade_str = request.form.get('quantidade')
        status = request.form.get('status', 'Ativo')
        descricao = request.form.get('descricao', '')
        imagem = request.files.get('imagem')
        seller_id = request.form.get('seller_id')

        if not nome or not preco_str or not quantidade_str:
            return jsonify({'message': 'Todos os campos obrigatórios devem ser preenchidos'}), 400

        try:
            preco = float(str(preco_str).replace(',', '.'))
            quantidade = int(quantidade_str)
        except (TypeError, ValueError):
            return jsonify({'message': f'Preço ou quantidade inválidos: preco={preco_str}, quantidade={quantidade_str}'}), 400

        nome_arquivo = None
        if imagem:
            nome_arquivo = secure_filename(imagem.filename)
            caminho_arquivo = os.path.join(UPLOAD_FOLDER, nome_arquivo)
            imagem.save(caminho_arquivo)

        novo_produto = Product(
            nome=nome,
            preco=preco,
            quantidade=quantidade,
            status=status,
            imagem=nome_arquivo,
            descricao=descricao,
            seller_id=seller_id
        )

        db.session.add(novo_produto)
        db.session.commit()

        return jsonify({'message': f'Produto "{nome}" cadastrado com sucesso!'}), 201

    except Exception as e:
        db.session.rollback()
        print("=== ERRO AO CADASTRAR PRODUTO ===")
        traceback.print_exc()  # Mostra o erro completo no console
        raise  # Deixa o Flask exibir o erro no navegador/console


# 📌 Listar todos os produtos
@produto_bp.route('/', methods=['GET'])
def listar_produtos():
    produtos = Product.query.all()
    produtos_list = [{
        'id': p.id,
        'nome': p.nome,
        'preco': p.preco,
        'quantidade': p.quantidade,
        'status': p.status,
        'imagem': p.imagem,
        'descricao': p.descricao,
        'seller_id': p.seller_id
    } for p in produtos]

    return jsonify(produtos_list), 200

# 📌 Buscar produto por ID
@produto_bp.route('/<int:id>', methods=['GET'])
def buscar_produto(id):
    produto = Product.query.get(id)

    if not produto:
        return jsonify({'message': 'Produto não encontrado'}), 404

    return jsonify({
        'id': produto.id,
        'nome': produto.nome,
        'preco': produto.preco,
        'quantidade': produto.quantidade,
        'status': produto.status,
        'imagem': produto.imagem,
        'descricao': produto.descricao,
        'seller_id': produto.seller_id
    }), 200

# 📌 Atualizar produto
@produto_bp.route('/<int:id>', methods=['PUT'])
def atualizar_produto(id):
    produto = Product.query.get(id)

    if not produto:
        return jsonify({'message': 'Produto não encontrado'}), 404

    if request.content_type.startswith("multipart/form-data"):
        produto.nome = request.form.get("nome", produto.nome)
        produto.preco = float(request.form.get("preco", produto.preco))
        produto.quantidade = int(request.form.get("quantidade", produto.quantidade))
        produto.status = request.form.get("status", produto.status)
        produto.descricao = request.form.get("descricao", produto.descricao)

        imagem = request.files.get("imagem")
        if imagem:
            nome_arquivo = secure_filename(imagem.filename)
            caminho_arquivo = os.path.join(UPLOAD_FOLDER, nome_arquivo)
            imagem.save(caminho_arquivo)
            produto.imagem = nome_arquivo
    else:
        data = request.get_json()
        produto.nome = data.get("nome", produto.nome)
        produto.preco = data.get("preco", produto.preco)
        produto.quantidade = data.get("quantidade", produto.quantidade)
        produto.status = data.get("status", produto.status)
        produto.descricao = data.get("descricao", produto.descricao)

    db.session.commit()
    return jsonify({'message': f'Produto "{produto.nome}" atualizado com sucesso!'}), 200

# 📌 Servir imagem
@produto_bp.route('/imagem/<nome_arquivo>', methods=['GET'])
def servir_imagem(nome_arquivo):
    return send_from_directory(UPLOAD_FOLDER, nome_arquivo)

# 📌 Excluir produto
@produto_bp.route('/<int:id>', methods=['DELETE'])
def excluir_produto(id):
    produto = Product.query.get(id)

    if not produto:
        return jsonify({'message': 'Produto não encontrado'}), 404

    db.session.delete(produto)
    db.session.commit()
    return jsonify({'message': f'Produto "{produto.nome}" excluído com sucesso!'}), 200
