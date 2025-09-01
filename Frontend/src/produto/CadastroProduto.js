import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CadastroProduto.css";

function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [imagem, setImagem] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !preco || !quantidade || !status) {
      setMensagem("Todos os campos são obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", parseFloat(preco.replace(",", ".")));
    formData.append("quantidade", parseInt(quantidade));
    formData.append("status", status);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/produtos", formData);

      // Aqui validamos o retorno
      if (response.status === 201 || response.data?.mensagem) {
        setMensagem("Produto cadastrado com sucesso!");
        setNome("");
        setPreco("");
        setQuantidade("");
        setStatus("Ativo");
        setImagem(null);

        setTimeout(() => {
          navigate("/listar-produtos");
        }, 1500);
      } else {
        setMensagem(response.data?.erro || "Erro ao cadastrar produto.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setMensagem("Erro ao cadastrar produto.");
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <button className="botao-voltar" onClick={() => navigate("/")}>
        Voltar para Início
      </button>
    </div>
  );
}

export default CadastroProduto;