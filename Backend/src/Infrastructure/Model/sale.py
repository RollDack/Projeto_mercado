from src.config.data_base import db
from datetime import datetime

class Sale(db.Model):
    __tablename__ = "Vendas"

    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, nullable=False)
    seller_id = db.Column(db.Integer, nullable=False)
    quantidade_vendida = db.Column(db.Integer, nullable=False)
    preco_unitario = db.Column(db.Float, nullable=False)
    data_venda = db.Column(db.DateTime, default=datetime.utcnow)

    # ✅ Novos campos que você usou no controller:
    estoque_antes = db.Column(db.Integer, nullable=False)
    estoque_depois = db.Column(db.Integer, nullable=False)

    