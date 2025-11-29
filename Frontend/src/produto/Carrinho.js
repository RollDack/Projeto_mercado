import React from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";
import { atualizarProduto } from "../services/produtoService";
import "./Carrinho.css";

function Carrinho() {
  const {
    carrinho,
    removerDoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    limparCarrinho,
  } = useCarrinho();
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrinho
      .reduce((acc, item) => acc + item.preco * item.quantidadeComprada, 0)
      .toFixed(2);
  };

  const finalizarCompra = async () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
      alert("Você precisa estar logado para finalizar a compra!");
      navigate("/login");
      return;
    }

    // Cria o pedido vinculado ao usuário
    const novoPedido = {
      id: Date.now(),
      data: new Date().toLocaleString("pt-BR"),
      itens: carrinho,
      total: carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidadeComprada,
        0
      ),
      status: "Pendente",
      usuarioEmail: usuarioLogado.email, // ✅ vincula o pedido ao usuário
    };

    // Recupera e salva os pedidos anteriores
    const pedidosAntigos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedidosAtualizados = [...pedidosAntigos, novoPedido];
    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));

    alert("✅ Compra finalizada com sucesso! Seu pedido está pendente.");

    // Atualiza estoque de cada produto
    for (const item of carrinho) {
      try {
        const novaQuantidade = item.quantidadeEmEstoque - item.quantidadeComprada;
        await atualizarProduto(item.id, {
          quantidade: novaQuantidade >= 0 ? novaQuantidade : 0,
        });
      } catch (error) {
        console.error("Erro ao atualizar estoque do produto:", item.nome, error);
      }
    }

    // Limpa carrinho e redireciona
    limparCarrinho();
    navigate("/minhas-compras");

    // Atualiza status automaticamente após 10s, se não foi cancelado
    setTimeout(() => {
      const pedidosAtuais = JSON.parse(localStorage.getItem("pedidos")) || [];

      const atualizados = pedidosAtuais.map((p) => {
        if (
          p.id === novoPedido.id &&
          p.status === "Pendente" &&
          p.usuarioEmail === usuarioLogado.email
        ) {
          return { ...p, status: "Concluído" };
        }
        return p;
      });

      localStorage.setItem("pedidos", JSON.stringify(atualizados));
    }, 10000);
  };

  return (
    <div className="carrinho-container">
      <h2>🛒 Carrinho de Compras</h2>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {carrinho.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>R$ {Number(item.preco).toFixed(2)}</td>
                <td>
                  <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantidadeComprada}</span>
                  <button onClick={() => aumentarQuantidade(item.id)}>+</button>
                </td>
                <td>R$ {(item.preco * item.quantidadeComprada).toFixed(2)}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Total da Compra: R$ {calcularTotal()}</h3>

      <button
        style={{
          marginTop: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={finalizarCompra}
      >
        Finalizar Compra
      </button>

      <button
        style={{
          marginTop: "10px",
          backgroundColor: "#6c63ff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/listar-produtos")}
      >
        Voltar para Lista de Produtos
      </button>
    </div>
  );
}

export default Carrinho;
