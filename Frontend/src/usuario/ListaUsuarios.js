import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListaUsuarios.css";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [expandido, setExpandido] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/users/");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const toggleExpandido = (id) => {
    setExpandido(expandido === id ? null : id);
  };

  return (
    <div className="usuarios-container">
      <h2>Usuários Cadastrados</h2>
      <ul className="usuarios-lista">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="usuario-item">
            <div className="usuario-header">
              <span>{usuario.name}</span>
              <button onClick={() => toggleExpandido(usuario.id)}>
                {expandido === usuario.id ? "▲" : "▼"}
              </button>
            </div>
            {expandido === usuario.id && (
              <div className="usuario-detalhes">
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Celular:</strong> {usuario.celular}</p>
                <p><strong>CPF:</strong> {usuario.cpf}</p>
                <p><strong>Status:</strong> {usuario.status}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
