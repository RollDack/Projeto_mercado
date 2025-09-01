import React, { useEffect, useState } from "react";
import { listarProdutos } from "../services/produtoService";
import { realizarVenda } from "../services/vendaService";
import { useNavigate } from "react-router-dom";
import "./VendaProduto.css";

function VendaProduto() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await listarProdutos();
        const ativos = lista.filter((p) => p.status === "Ativo");
        setProdutos(ativos);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    carregar();
  }, []);

  const handleVenda = async () => {
    if (!produtoSelecionado || quantidade <= 0) {
      setMensagem("Selecione um produto e uma quantidade válida.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = usuario?.access_token;

    if (!token) {
      setMensagem("Você precisa estar logado para realizar uma venda.");
      return;
    }

    try {
      await realizarVenda(
        {
          produto_id: produtoSelecionado,
          quantidade: parseInt(quantidade),
        },
        token
      );

      setMensagem("✅ Venda realizada com sucesso!");
      setProdutoSelecionado("");
      setQuantidade(1);
    } catch (error) {
      console.error("Erro ao realizar venda:", error);
      setMensagem(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Erro ao realizar a venda."
      );
    }
  };

  return (
    <div className="venda-container">
      <h2>Realizar Venda</h2>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <label>Produto:</label>
      <select
        value={produtoSelecionado}
        onChange={(e) => setProdutoSelecionado(e.target.value)}
      >
        <option value="">Selecione um produto</option>
        {produtos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome} - R$ {p.preco.toFixed(2)}
          </option>
        ))}
      </select>

      <label>Quantidade:</label>
      <input
        type="number"
        value={quantidade}
        min={1}
        onChange={(e) => setQuantidade(e.target.value)}
      />

      <button onClick={handleVenda}>Confirmar Venda</button>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default VendaProduto;
