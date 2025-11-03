import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendasRealizadas.css";

function VendasRealizadas() {
  const [vendas, setVendas] = useState([]);
  const [expandir, setExpandir] = useState({});
  const navigate = useNavigate();

  
  useEffect(() => {
    const armazenadas = JSON.parse(localStorage.getItem("vendas")) || [];
    setVendas(armazenadas);
  }, []);

  
  useEffect(() => {
    const intervalo = setInterval(() => {
      const atualizadas = JSON.parse(localStorage.getItem("vendas")) || [];
      setVendas(atualizadas);
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  // Cancelar venda
  const cancelarVenda = (id) => {
    if (!window.confirm("Tem certeza que deseja cancelar este pedido?")) return;

    const atualizadas = vendas.map((venda) =>
      venda.id === id && venda.status === "Pendente"
        ? { ...venda, status: "Cancelado" }
        : venda
    );

    setVendas(atualizadas);
    localStorage.setItem("vendas", JSON.stringify(atualizadas));
  };

  const toggleExpandir = (id) => {
    setExpandir((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="vendas-container">
      <h2>📋 Relatório de Compras</h2>

      {vendas.length === 0 ? (
        <p>Nenhuma compra realizada ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <React.Fragment key={venda.id}>
                <tr>
                  <td>{venda.id}</td>
                  <td>{venda.data}</td>
                  <td>R$ {venda.total.toFixed(2)}</td>
                  <td
                    className={
                      venda.status === "Concluído"
                        ? "status-concluido"
                        : venda.status === "Pendente"
                        ? "status-pendente"
                        : "status-cancelado"
                    }
                  >
                    {venda.status}
                  </td>
                  <td>
                    <button
                      className="btn-detalhes"
                      onClick={() => toggleExpandir(venda.id)}
                    >
                      {expandir[venda.id] ? "Ocultar" : "Ver Itens"}
                    </button>

                    {venda.status === "Pendente" && (
                      <button
                        className="btn-cancelar"
                        onClick={() => cancelarVenda(venda.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>

                {expandir[venda.id] && (
                  <tr className="detalhes-row">
                    <td colSpan="5">
                      <ul className="itens-lista">
                        {venda.itens.map((item) => (
                          <li key={item.id}>
                            <strong>{item.nome}</strong> — {item.quantidadeComprada}x @{" "}
                            R$ {item.preco.toFixed(2)} ={" "}
                            <strong>
                              R$ {(item.preco * item.quantidadeComprada).toFixed(2)}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="botao-voltar"
        onClick={() => navigate("/listar-produtos")}
      >
        Voltar para Lista de Produtos
      </button>
    </div>
  );
}

export default VendasRealizadas;
