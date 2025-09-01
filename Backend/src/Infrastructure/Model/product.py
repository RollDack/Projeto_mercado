from src.config.data_base import db

class Product(db.Model):
    __tablename__ = "produtos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    descricao = db.Column(db.String(255))
    status = db.Column(db.String(20), default="Ativo")
    imagem = db.Column(db.String(255))  # Caminho ou nome do arquivo da imagem
    seller_id = db.Column(db.Integer, nullable=False, default=1)

    def __repr__(self):
        return f"<Product {self.nome}>"
