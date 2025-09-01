import api from "./api";

// 📌 Listar produtos
export async function listarProdutos() {
  try {
    const response = await api.get("/produtos");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw error;
  }
}

// 📌 Buscar produto por ID
export async function buscarProdutoPorId(id) {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}

// 📌 Atualizar produto
export async function atualizarProduto(id, dadosAtualizados) {
  try {
    const response = await api.put(`/produtos/${id}`, dadosAtualizados);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
}

// 📌 Cadastrar produto
export async function cadastrarProduto(dadosProduto) {
  try {
    const response = await api.post("/produtos", dadosProduto);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    throw error;
  }
}

// 📌 Excluir produto
export async function excluirProduto(id) {
  try {
    const response = await api.delete(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }
}