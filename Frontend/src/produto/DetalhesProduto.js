import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarProdutoPorId } from "../services/produtoService";
import "./DetalhesProduto.css";

function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        const dados = await buscarProdutoPorId(id);
        setProduto(dados);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setMensagem("Erro ao carregar detalhes do produto.");
      }
    };

    carregarDetalhes();
  }, [id]);

  if (mensagem) {
    return <p className="mensagem erro">{mensagem}</p>;
  }

  if (!produto) {
    return <p className="mensagem">Carregando detalhes...</p>;
  }

  return (
    <div className="detalhes-container">
      <h2>Detalhes do Produto</h2>
      <div className="detalhes-card">
        <p><strong>Nome:</strong> {produto.nome}</p>
        <p><strong>Preço:</strong> R$ {produto.preco ? produto.preco.toFixed(2) : "N/A"}</p>

        <p><strong>Quantidade:</strong> {produto.quantidade}</p>
        <p><strong>Status:</strong> {produto.status}</p>
      </div>
      <button className="btn-voltar" onClick={() => navigate("/listar-produtos")}>
        Voltar para Lista
      </button>
    </div>
  );
}

export default DetalhesProduto;
