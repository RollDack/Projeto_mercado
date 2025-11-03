import React, { createContext, useContext, useState } from "react";


const CarrinhoContext = createContext();


export function useCarrinho() {
  return useContext(CarrinhoContext);
}


export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const existe = prevCarrinho.find((item) => item.id === produto.id);

      if (existe) {
        
        return prevCarrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidadeComprada: item.quantidadeComprada + 1 }
            : item
        );
      }

      
      alert(`${produto.nome} foi adicionado ao carrinho!`);
      return [
        ...prevCarrinho,
        {
          ...produto,
          quantidadeEmEstoque: produto.quantidade, 
          quantidadeComprada: 1, 
        },
      ];
    });
  };

  
  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  
  const aumentarQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantidadeComprada: item.quantidadeComprada + 1 }
          : item
      )
    );
  };

  
  const diminuirQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id && item.quantidadeComprada > 1
          ? { ...item, quantidadeComprada: item.quantidadeComprada - 1 }
          : item
      )
    );
  };

  
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  
  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const novaVenda = {
      id: Date.now(),
      data: new Date().toLocaleString("pt-BR"),
      itens: carrinho,
      total: carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidadeComprada,
        0
      ),
      status: "Pendente",
    };

    
    const vendasAntigas = JSON.parse(localStorage.getItem("vendas")) || [];
    const vendasAtualizadas = [...vendasAntigas, novaVenda];

    
    localStorage.setItem("vendas", JSON.stringify(vendasAtualizadas));

    alert("✅ Compra finalizada! Seu pedido está pendente.");
    limparCarrinho();

    
    setTimeout(() => {
      const vendasAtualizadas = JSON.parse(localStorage.getItem("vendas")) || [];
      const vendasCompletas = vendasAtualizadas.map((venda) =>
        venda.id === novaVenda.id && venda.status === "Pendente"
          ? { ...venda, status: "Concluído" }
          : venda
      );
      localStorage.setItem("vendas", JSON.stringify(vendasCompletas));
    }, 15000);
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
        finalizarCompra, 
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
