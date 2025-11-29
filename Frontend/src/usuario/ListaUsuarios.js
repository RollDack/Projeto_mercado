import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ListaUsuarios.css";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/users/");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setMensagem("Erro ao carregar usuários.");
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Usuários Cadastrados</h2>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul className="lista-usuarios">
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              <p>
                <strong>Nome:</strong> {usuario.name}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>Celular:</strong> {usuario.celular || "Não informado"}
              </p>
              <p>
                <strong>CPF:</strong> {usuario.cpf || "Não informado"}
              </p>
              <p>
                <strong>Status:</strong> {usuario.status || "Ativo"}
              </p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default ListaUsuarios;
