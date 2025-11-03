// src/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#dbeeff", height: "100vh", paddingTop: "50px" }}>
      <h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold" }}>MERCADO</h1>
      <div style={{ maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px" }}>
        <button onClick={() => navigate("/login")} style={botaoStyle}>Login</button>
        <button onClick={() => navigate("/cadastro-produto")} style={botaoStyle}>Cadastro de Produtos</button>
        <button onClick={() => navigate("/listar-produtos")} style={botaoStyle}>Listar Produtos</button>
        <button onClick={() => navigate("/cadastro-usuario")} style={botaoStyle}>Cadastro de Usuários</button>
        
        <button onClick={() => navigate("/vendas")} style={botaoStyle}>Compras Realizadas</button>
      </div>
    </div>
  );
}

const botaoStyle = {
  backgroundColor: "#1e90ff",
  color: "white",
  fontWeight: "bold",
  border: "none",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "10px",
  cursor: "pointer"
};

export default HomePage;
