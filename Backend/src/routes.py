from src.Application.Controllers.seller_controller import seller_bp
from src.Application.Controllers.user_controller import user_bp
from src.Application.Controllers.produto_controller import produto_bp

def init_routes(app):
    app.register_blueprint(seller_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(produto_bp)
