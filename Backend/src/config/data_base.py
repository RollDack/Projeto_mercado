from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

db = SQLAlchemy()
migrate = Migrate()

def configure_database(app):
    # 🔑 Secret key (pode ser usada depois em autenticação, cookies, etc.)
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "sua_chave_secreta_aqui")

    # 🔌 Configuração da URI de conexão
    # Usa variável de ambiente DATABASE_URL (definida no docker-compose ou localmente)
    # Exemplo: mysql+mysqlconnector://user:password@db:3306/mercado_db
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        "DATABASE_URL",
        "mysql+mysqlconnector://root:password@localhost/mercado_db"
    )

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # 🔗 Inicializa DB e Migrations
    db.init_app(app)
    migrate.init_app(app, db)
