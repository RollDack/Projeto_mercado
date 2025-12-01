import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const resultado = await response.json();

      if (response.ok) {
        // Guarda os dados do usuário logado
        localStorage.setItem("usuarioLogado", JSON.stringify(resultado));

        setMensagem(`Bem-vindo, ${resultado.name}!`);

        // Redireciona para a HOME em vez de /perfil
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMensagem(resultado.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-container">
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
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <button onClick={() => navigate("/ativar-conta")}>Ativar Conta</button>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default Login;
