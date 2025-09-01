from flask import Flask, send_from_directory
from flask_cors import CORS
from src.config.data_base import db, configure_database
from src.routes import init_routes
import os

# ✅ Cria aplicação Flask
app = Flask(__name__)

# ✅ Configura CORS para o frontend (React em http://localhost:3000)
CORS(app,
     resources={r"/*": {"origins": "http://localhost:3000"}},
     supports_credentials=True,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type"])

# ✅ Configura pasta de uploads de imagens
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'src', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ✅ Rota para servir arquivos de imagem
@app.route("/uploads/<path:filename>")
def servir_imagem(filename):
    diretorio = os.path.join(os.getcwd(), "src", "uploads")
    return send_from_directory(diretorio, filename)

# ✅ Conecta com banco de dados
configure_database(app)

# ✅ Registra rotas (produtos, sellers, users)
init_routes(app)

# ✅ Executa aplicação
if __name__ == "__main__":
    app.run(debug=True)
