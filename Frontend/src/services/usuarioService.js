import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/users";

// -------------------------
// CADASTRAR USUÁRIO
// -------------------------
export const cadastrarUsuario = async (usuario) => {
  try {
    const response = await axios.post(API_URL, usuario);
    return {
      success: true,
      message: response.data.message || "Usuário cadastrado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Erro desconhecido ao cadastrar usuário.",
    };
  }
};

// -------------------------
// BUSCAR USUÁRIO POR ID
// -------------------------
export const buscarUsuarioPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    return null;
  }
};

// -------------------------
// ATUALIZAR PERFIL
// -------------------------
export const atualizarPerfil = async (id, dados) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dados);
    return {
      success: true,
      message: "Perfil atualizado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Erro ao atualizar o perfil.",
    };
  }
};

// -------------------------
// ALTERAR SENHA
// -------------------------
export const alterarSenha = async (id, senhaAtual, novaSenha) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/alterar-senha`, {
      senhaAtual,
      novaSenha,
    });

    return {
      success: true,
      message: response.data.message || "Senha alterada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Erro ao alterar a senha.",
    };
  }
};
