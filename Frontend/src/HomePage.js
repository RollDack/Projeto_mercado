// src/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <h2 style={{ color: "white", margin: 0 }}>MERCADO</h2>
        <div style={linksStyle}>
          <button onClick={() => navigate("/login")} style={linkButton}>Login</button>
          <button onClick={() => navigate("/cadastro-produto")} style={linkButton}>Cadastro de Produtos</button>
          <button onClick={() => navigate("/listar-produtos")} style={linkButton}>Listar Produtos</button>
          <button onClick={() => navigate("/cadastro-usuario")} style={linkButton}>Cadastro de Usuários</button>
          <button onClick={() => navigate("/vendas")} style={linkButton}>Compras Realizadas</button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div style={contentStyle}>
        <h1>Bem-vindo ao Mercado!</h1>
        <p>Use o menu acima para navegar pelo sistema.</p>
      </div>
    </div>
  );
}

// 🎨 Estilos
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#1e90ff",
  padding: "15px 30px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
};

const linksStyle = {
  display: "flex",
  gap: "15px",
};

const linkButton = {
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const contentStyle = {
  marginTop: "100px",
  textAlign: "center",
};

export default HomePage;