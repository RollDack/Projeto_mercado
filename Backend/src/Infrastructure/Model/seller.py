from src.config.data_base import db


class Seller(db.Model):
    __tablename__ = "seller"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    cnpj = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    celular = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="Inativo")
    activation_code = db.Column(db.String(10), nullable=True)
