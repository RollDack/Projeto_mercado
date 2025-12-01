import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroUsuario from './usuario/CadastroUsuario';
import ListaUsuarios from "./usuario/ListaUsuarios";
import CadastroProduto from './produto/CadastroProduto';
import ListarProdutos from './produto/ListarProdutos';
import EditarProduto from './produto/EditarProduto';
import Carrinho from "./produto/Carrinho";
import Login from './usuario/Login';
import HomePage from './HomePage'; 
import VendaProduto from "./venda/VendaProduto";
import DetalhesProduto from './produto/DetalhesProduto';
import ListarVendas from "./venda/ListarVendas";
import VendasRealizadas from "./venda/VendasRealizadas";
import AtivarConta from "./usuario/AtivarConta";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import PerfilUsuario from "./usuario/PerfilUsuario";
import EditarPerfil from "./usuario/EditarPerfil";
import AlterarSenha from "./usuario/AlterarSenha";
import MinhasCompras from "./usuario/MinhasCompras";



<Route path="/listar-vendas" element={<ListarVendas />} />




function App() {
  return (
    <CarrinhoProvider>
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
            <Route path="/cadastro-produto" element={<CadastroProduto />} />
            <Route path="/listar-produtos" element={<ListarProdutos />} />
            <Route path="/editar-produto/:id" element={<EditarProduto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/venda" element={<VendaProduto />} />
            <Route path="/listar-vendas" element={<ListarVendas />} />
            <Route path="/produtos/:id" element={<DetalhesProduto />} />
            <Route path="/vendas" element={<VendasRealizadas />} />
            <Route path="/ativar-conta" element={<AtivarConta />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
            <Route path="/alterar-senha" element={<AlterarSenha />} />
            <Route path="/minhas-compras" element={<MinhasCompras />} />
          </Routes>
        </Router>
    </CarrinhoProvider>
  );
}

export default App;
