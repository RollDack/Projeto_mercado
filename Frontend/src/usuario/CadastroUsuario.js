import React, { useState } from 'react';
import './CadastroUsuario.css';
import { cadastrarUsuario } from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoUsuario = {
      name: nome,
      email: email,
      celular: celular,
      password: senha,
      cpf: cpf
    };

    const resultado = await cadastrarUsuario(novoUsuario);

    if (resultado.success) {
      setMensagem("Usuário cadastrado com sucesso!");
      setNome('');
      setEmail('');
      setCelular('');
      setSenha('');
      setCpf('');
    } else {
      setMensagem(`Erro: ${resultado.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}


      <button
        style={{
          marginTop: "10px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/usuarios")}
      >
        Ver Usuários Cadastrados
      </button>

      <button
        style={{
          marginTop: "10px",
          backgroundColor: "#6c63ff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      >
        Voltar para Início
      </button>
    </div>
  );
}

export default CadastroUsuario;
