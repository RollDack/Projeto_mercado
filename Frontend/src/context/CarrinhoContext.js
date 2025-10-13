import React, { createContext, useContext, useState } from "react";

// Criamos o contexto
const CarrinhoContext = createContext();

// Hook para acessar o contexto de forma mais fácil
export function useCarrinho() {
  return useContext(CarrinhoContext);
}

// Provider que vai "envolver" a aplicação
export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // Adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const existe = prevCarrinho.find((item) => item.id === produto.id);

      if (existe) {
        // Se já existe no carrinho, aumenta a quantidade comprada
        return prevCarrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidadeComprada: item.quantidadeComprada + 1 }
            : item
        );
      }

      // Se não existe, adiciona com quantidadeComprada = 1
      alert(`${produto.nome} foi adicionado ao carrinho!`);
      return [
        ...prevCarrinho,
        {
          ...produto,
          quantidadeEmEstoque: produto.quantidade, // estoque original do backend
          quantidadeComprada: 1,                   // começa com 1 no carrinho
        },
      ];
    });
  };

  // Remover produto do carrinho
  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  // Aumentar quantidade comprada
  const aumentarQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantidadeComprada: item.quantidadeComprada + 1 }
          : item
      )
    );
  };

  // Diminuir quantidade comprada
  const diminuirQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id && item.quantidadeComprada > 1
          ? { ...item, quantidadeComprada: item.quantidadeComprada - 1 }
          : item
      )
    );
  };

  // Limpar carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}