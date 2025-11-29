import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MinhasCompras.css";

function MinhasCompras() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [meusPedidos, setMeusPedidos] = useState([]);

  // 🔹 Carrega o usuário logado e seus pedidos
  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioSalvo) {
      alert("Você precisa estar logado para ver suas compras!");
      navigate("/login");
      return;
    }
    setUsuario(usuarioSalvo);

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedidosUsuario = pedidos.filter(
      (p) => p.usuarioEmail === usuarioSalvo.email
    );
    setMeusPedidos(pedidosUsuario);
  }, [navigate]);

  // 🔹 Cancelar pedido
  const cancelarPedido = (id) => {
    if (window.confirm("Tem certeza que deseja cancelar este pedido?")) {
      const pedidosAtualizados = meusPedidos.map((p) =>
        p.id === id ? { ...p, status: "Cancelado" } : p
      );
      setMeusPedidos(pedidosAtualizados);

      // Atualiza no localStorage global também
      const todosPedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
      const globalAtualizado = todosPedidos.map((p) =>
        p.id === id ? { ...p, status: "Cancelado" } : p
      );
      localStorage.setItem("pedidos", JSON.stringify(globalAtualizado));
    }
  };

  // 🔹 Exibir detalhes de cada pedido
  const renderPedido = (pedido) => (
    <div key={pedido.id} className="pedido-card">
      <h3>Pedido #{pedido.id}</h3>
      <p><strong>Data:</strong> {pedido.data}</p>
      <p><strong>Status:</strong> {pedido.status}</p>
      <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

      <h4>Itens:</h4>
      <ul>
        {pedido.itens.map((item) => (
          <li key={item.id}>
            {item.nome} — {item.quantidadeComprada}x R$ {item.preco.toFixed(2)}
          </li>
        ))}
      </ul>

      {pedido.status === "Pendente" && (
        <button
          className="btn-cancelar"
          onClick={() => cancelarPedido(pedido.id)}
        >
          Cancelar Pedido
        </button>
      )}
    </div>
  );

  return (
    <div className="minhas-compras-container">
      <h2>Minhas Compras</h2>

      {meusPedidos.length === 0 ? (
        <p>Você ainda não realizou nenhuma compra.</p>
      ) : (
        meusPedidos.map(renderPedido)
      )}

      <button onClick={() => navigate("/")} className="btn-voltar">
        Voltar para Início
      </button>
    </div>
  );
}

export default MinhasCompras;
