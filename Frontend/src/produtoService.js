import axios from "axios";

const API_URL = "http://localhost:5000/api/produtos"; // rota base para produtos

// 📌 Cadastrar produto
export const cadastrarProduto = async (produto) => {
  try {
    const response = await axios.post(API_URL, produto, {
      headers: {
        "Content-Type": produto instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Erro ao cadastrar produto",
    };
  }
};

// 📌 Listar produtos
export const listarProdutos = async () => {
  try {
    console.log("🔍 Chamando API de produtos...");
    const response = await axios.get(API_URL);
    console.log("📦 Resposta bruta da API:", response);
    console.log("📦 Dados recebidos (response.data):", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro no listarProdutos:", error);
    throw error;
  }
};


// 📌 Buscar produto por ID
export const buscarProdutoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 📌 Atualizar produto
export const atualizarProduto = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": formData instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};

// 📌 Excluir produto
export const excluirProduto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
