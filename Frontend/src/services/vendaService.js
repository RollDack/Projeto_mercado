import api from "./api";

// Realizar venda
export const realizarVenda = async (dados, token) => {
  return await api.post("/vendas", dados, {
    headers: {
      'Content-Type': "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

// Listar vendas
export const listarVendas = async (token) => {
  return await api.get("/vendas", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
