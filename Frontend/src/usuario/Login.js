import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correto
import "./Login.css";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate(); // ✅ Inicializa o useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    const resultado = await login(email, password);

    if (resultado.success) {
      setMensagem("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/venda"); // ✅ Redireciona após login
      }, 1000);
    } else {
      setMensagem(`Erro: ${resultado.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {/* Botão de Ativação */}
      <button
        type="button"
        onClick={() => navigate("/ativar-conta")}
        style={{
          marginTop: "10px",
          backgroundColor: "#6c63ff",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Ativar Conta
      </button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Login;
