import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PerfilUsuario.css";

function PerfilUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!dados) {
      navigate("/login");
      return;
    }

    setUsuario(dados);
  }, []);

  if (!usuario) return null;

  return (
    <div className="perfil-container">
      <h2>Meu Perfil</h2>

      <div className="perfil-card">
          <img
            src={
              usuario.foto
                ? `http://127.0.0.1:5000/${usuario.foto}`
                : "/default-avatar.png"
            }
            alt="Foto de perfil"
            className="perfil-foto"
          />



        <p><strong>Nome:</strong> {usuario.name}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Celular:</strong> {usuario.celular}</p>

        <p><strong>Status:</strong> {usuario.status}</p>

        <div className="perfil-botoes">
          <button onClick={() => navigate("/editar-perfil")} className="btn-editar">
            Editar Informações
          </button>

          <button onClick={() => navigate("/alterar-senha")} className="btn-senha">
            Alterar Senha
          </button>

          <button onClick={() => navigate("/")} className="btn-voltar">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilUsuario;
