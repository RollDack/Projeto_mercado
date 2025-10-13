import React, { useState, useEffect } from "react";
import { useCarrinho } from "../context/CarrinhoContext"; // ✅ Contexto do carrinho
import {
  listarProdutos,
  atualizarProduto,
  buscarProdutoPorId,
  excluirProduto
} from "../services/produtoService";
import { useNavigate } from "react-router-dom";
import "./ListarProdutos.css";

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const { adicionarAoCarrinho } = useCarrinho(); // ✅ usando função do contexto
  const navigate = useNavigate();

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const lista = await listarProdutos();
      console.log("✅ Lista recebida no componente:", lista);
      console.log("📏 Tipo de lista:", Array.isArray(lista) ? "Array" : typeof lista);
      setProdutos(lista);
    } catch (error) {
      setMensagem("Erro ao carregar produtos.");
      console.error(error);
    }
  };

  const handleEditar = (id) => {
    navigate(`/editar-produto/${id}`);
  };

  const handleDetalhes = (id) => {
    navigate(`/produtos/${id}`);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await excluirProduto(id);
        carregarProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  return (
    <div className="lista-container">
      <h2>Lista de Produtos</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.imagem ? (
                    <img
                      src={`http://localhost:5000/api/produtos/imagem/${p.imagem}`}
                      alt={p.nome || "Produto sem nome"}
                      width="60"
                    />
                  ) : (
                    "Sem imagem"
                  )}
                </td>
                <td>{p.nome || "Sem nome"}</td>
                <td>
                  R${" "}
                  {p.preco !== null && p.preco !== undefined && !isNaN(p.preco)
                    ? Number(p.preco).toFixed(2)
                    : "0.00"}
                </td>
                <td>{p.quantidade ?? 0}</td>
                <td>{p.status || "Indefinido"}</td>
                <td>
                  <button
                    onClick={() => handleDetalhes(p.id)}
                    className="btn-detalhes"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleEditar(p.id)}
                    className="btn-editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(p.id)}
                    className="btn-excluir"
                  >
                    Excluir
                  </button>
                  {/* ✅ Novo botão de compra (usa o contexto) */}
                  <button
                    onClick={() => adicionarAoCarrinho(p)}
                    style={{
                      backgroundColor: "#ffa500",
                      color: "white",
                      padding: "8px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "5px",
                      width: "100%"
                    }}
                  >
                    Comprar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="botao-voltar" onClick={() => navigate("/")}>
        Voltar para Início
      </button>

      {/* ✅ Botão para visualizar carrinho */}
      <button
        style={{
          marginTop: "20px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/carrinho")}
      >
        Ver Carrinho
      </button>
    </div>
  );
}

export default ListarProdutos;
