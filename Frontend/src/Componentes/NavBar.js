import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navBar">
      <h2>Mercado</h2>
      <div className="nav-links">
        <Link to="/">Início</Link>
        <Link to="/login">Login</Link>
        <Link to="/cadastro-usuario">Cadastro Usuário</Link>
        <Link to="/cadastro-produto">Cadastro Produto</Link>
        <Link to="/listar-produtos">Listar Produtos</Link>
        <Link to="/venda">Vender Produto</Link> {/* ✅ Botão novo */}
      </div>
    </nav>
  );
}

export default NavBar;
