import React, { useEffect, useState } from "react";
import { listarVendas } from "../services/vendaService";
import { useNavigate } from "react-router-dom";
import "./VendasRealizadas.css";

function VendasRealizadas() {
  const [vendas, setVendas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const carregarVendas = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const token = usuario?.access_token;
        const resposta = await listarVendas(token);
        setVendas(resposta.data);
      } catch (error) {
        setErro("Erro ao carregar vendas.");
      }
    };

    carregarVendas();
  }, []);

  const totalGeral = vendas.reduce(
    (acc, v) => acc + v.preco_unitario * v.quantidade_vendida,
    0
  );

  return (
    <div className="vendas-container">
      <h2>Vendas Realizadas</h2>
      {erro && <p className="erro">{erro}</p>}

      {vendas.length === 0 ? (
        <p>Nenhuma venda realizada ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço Unitário</th>
              <th>Subtotal</th>
              <th>Estoque Antes</th>
              <th>Estoque Depois</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.produto_id} - {venda.produto_nome}</td>
                <td>{venda.quantidade_vendida}</td>
                <td>R$ {venda.preco_unitario.toFixed(2)}</td>
                <td>R$ {(venda.preco_unitario * venda.quantidade_vendida).toFixed(2)}</td>
                <td>{venda.estoque_antes}</td>
                <td>{venda.estoque_depois}</td>
                <td>{venda.data_venda}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: "right" }}>
                <strong>Total Geral:</strong>
              </td>
              <td colSpan="4">
                <strong>R$ {totalGeral.toFixed(2)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Voltar para Início
      </button>
    </div>
  );
}

export default VendasRealizadas;
