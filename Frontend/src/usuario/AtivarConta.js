import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CadastroUsuario.css"; // reaproveita o estilo

function AtivarConta() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleAtivacao = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/sellers/activate", {
        email,
        activation_code: codigo,
      });
      setMensagem("✅ Conta ativada com sucesso! Você já pode fazer login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Erro ao ativar a conta.";
      setMensagem(`❌ ${msg}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Ativar Conta</h2>
      <form onSubmit={handleAtivacao}>
        <input
          type="email"
          placeholder="E-mail usado no cadastro"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Código de ativação"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <button type="submit">Ativar Conta</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AtivarConta;
