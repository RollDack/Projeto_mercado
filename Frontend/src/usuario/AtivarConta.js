import React from "react";
import { useNavigate } from "react-router-dom";
import "./AtivarConta.css";

function AtivarConta() {
  const navigate = useNavigate();

  const simularAtivacao = () => {
    alert("✅ Conta ativada com sucesso (simulação)!");
    navigate("/login");
  };

  return (
    <div className="ativar-container">
      <h2>Ativar Conta</h2>
      <p>
        Este recurso está temporariamente simulado. Clique abaixo para ativar
        sua conta.
      </p>
      <button onClick={simularAtivacao}>Ativar Conta</button>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default AtivarConta;
