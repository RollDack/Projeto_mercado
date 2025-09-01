import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarProduto } from "../services/produtoService";
import "./CadastroProduto.css";

function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProduto = {
      nome: nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
      status: status
    };

    try {
      await cadastrarProduto(novoProduto);
      setMensagem("Produto cadastrado com sucesso!");
      setNome("");
      setPreco("");
      setQuantidade("");
      setStatus("Ativo");
    } catch (error) {
      const msg = error.response?.data?.message || "Erro ao cadastrar produto.";
      setMensagem(msg);
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Produto</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
        <button type="submit">Cadastrar Produto</button>
      </form>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default CadastroProduto;
