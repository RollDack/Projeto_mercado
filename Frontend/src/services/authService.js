// src/services/authService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/users"; // 👈 Corrigido

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    // Salvando dados do usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(response.data));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Erro no login.",
    };
  }
};
