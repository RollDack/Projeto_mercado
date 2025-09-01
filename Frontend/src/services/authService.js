// src/services/authService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/sellers";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    }, {
      withCredentials: true  // ✅ adiciona isso aqui
    });

    // Salva o token no localStorage
    localStorage.setItem("usuario", JSON.stringify(response.data));
    console.log("Token salvo no localStorage:", response.data);

    return { success: true };
  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Erro desconhecido",
    };
  }
};
