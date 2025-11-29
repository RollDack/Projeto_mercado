import React, { useState } from "react";
import { cadastrarUsuario } from "../services/usuarioService";
import { useNavigate } from "react-router-dom";
import "./CadastroUsuario.css";

function CadastroUsuario() {
  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    celular: "",
    password: "",
    cpf: "",
  });

  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await cadastrarUsuario(usuario);
    setMensagem(resultado.message);

    if (resultado.success) {
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={usuario.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={usuario.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="celular"
          placeholder="Celular"
          value={usuario.celular}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={usuario.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={usuario.cpf}
          onChange={handleChange}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <button onClick={() => navigate("/usuarios")}>
        Ver Usuários Cadastrados
      </button>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default CadastroUsuario;