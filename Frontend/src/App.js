import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroUsuario from './usuario/CadastroUsuario';
import CadastroProduto from './produto/CadastroProduto';
import ListarProdutos from './produto/ListarProdutos';
import EditarProduto from './produto/EditarProduto';
import Login from './usuario/Login';
import HomePage from './HomePage'; // <-- nova Home
import VendaProduto from "./venda/VendaProduto";
import DetalhesProduto from './produto/DetalhesProduto';
import ListarVendas from "./venda/ListarVendas";
import VendasRealizadas from "./venda/VendasRealizadas";
import AtivarConta from "./usuario/AtivarConta";




<Route path="/listar-vendas" element={<ListarVendas />} />




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
        <Route path="/listar-produtos" element={<ListarProdutos />} />
        <Route path="/editar-produto/:id" element={<EditarProduto />} />
        <Route path="/venda" element={<VendaProduto />} />
        <Route path="/listar-vendas" element={<ListarVendas />} />
        <Route path="/produtos/:id" element={<DetalhesProduto />} />
        <Route path="/vendas-realizadas" element={<VendasRealizadas />} />
        <Route path="/ativar-conta" element={<AtivarConta />} />

      </Routes>
    </Router>
  );
}

export default App;
