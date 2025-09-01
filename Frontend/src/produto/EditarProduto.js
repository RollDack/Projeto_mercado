import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarProdutoPorId, atualizarProduto, excluirProduto } from "../services/produtoService";
import "./EditarProduto.css";

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    quantidade: "",
    status: "Ativo",
    descricao: "",
    imagem: ""
  });

  const [novaImagem, setNovaImagem] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const dados = await buscarProdutoPorId(id);
        setProduto(dados);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setMensagem("Erro ao carregar dados do produto.");
      }
    };

    carregarProduto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // ➕ função nova dentro do componente
const handleExcluir = async () => {
  if (window.confirm("Tem certeza que deseja excluir este produto?")) {
    try {
      await excluirProduto(id);
      navigate("/listar-produtos");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      setMensagem("Erro ao excluir produto.");
    }
  }
};

  const handleImagemChange = (e) => {
    setNovaImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = usuario?.access_token;

    const formData = new FormData();
    formData.append("nome", produto.nome);
    formData.append("preco", parseFloat(produto.preco));
    formData.append("quantidade", parseInt(produto.quantidade));
    formData.append("status", produto.status);
    formData.append("descricao", produto.descricao);

    if (novaImagem) {
      formData.append("imagem", novaImagem);
    }

    try {
      await atualizarProduto(id, formData, token);
      setMensagem("Produto atualizado com sucesso!");
      setTimeout(() => navigate("/listar-produtos"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setMensagem("Erro ao atualizar produto.");
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={produto.nome}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          step="0.01"
          placeholder="Preço"
          value={produto.preco}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          value={produto.quantidade}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={produto.status}
          onChange={handleChange}
          required
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={produto.descricao}
          onChange={handleChange}
        />

        {produto.imagem && (
          <div style={{ marginBottom: "10px" }}>
            <strong>Imagem atual:</strong><br />
            <img
              src={`${process.env.REACT_APP_API_URL}/api/produtos/imagem/${produto.imagem}`}
              alt="Imagem atual"
              style={{ width: "120px", borderRadius: "8px", marginTop: "5px" }}
            />
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleImagemChange} />

        <button type="submit">Salvar Alterações</button>
      </form>
      <button type="button" className="btn-excluir" onClick={handleExcluir}>
  Excluir Produto
</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default EditarProduto;
