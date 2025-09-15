import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/users';  // ✅ corrigido para users

export const cadastrarUsuario = async (usuario) => {
  try {
    const response = await axios.post(API_URL, usuario);

    console.log('Resposta do cadastro:', response.data);

    return { 
      success: true, 
      message: response.data.message || 'Usuário cadastrado com sucesso!' 
    };
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.response || error);
    return {
      success: false,
      message: error.response?.data?.message || 'Erro desconhecido ao cadastrar usuário.',
    };
  }
};

