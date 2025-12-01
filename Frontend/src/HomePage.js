import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Carregar login salvo
  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setUsuario(null);
    navigate("/");
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">MERCADO</div>

        <ul className="navbar-links">

          {!usuario ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/cadastro-produto">Cadastro de Produtos</Link></li>
              <li><Link to="/listar-produtos">Listar Produtos</Link></li>
              <li><Link to="/cadastro-usuario">Cadastro de Usuários</Link></li>
              <li><Link to="/vendas">Compras Realizadas</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/perfil">Perfil</Link></li>
              <li><Link to="/listar-produtos">Listar Produtos</Link></li>
              <li><Link to="/vendas">Compras Realizadas</Link></li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="logout-btn"
                >
                  Sair
                </button>
              </li>
            </>
          )}

        </ul>
      </nav>

      {/* CONTEÚDO DA HOME */}
      <div className="homepage-container">
        <h1>Bem-vindo ao Mercado!</h1>
        <p>Use o menu acima para navegar pelo sistema.</p>
      </div>
    </div>
  );
}

export default HomePage;
