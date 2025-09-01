import React, { useEffect, useState } from "react";
import { listarVendas } from "../services/vendaService";
import { useNavigate } from "react-router-dom";
import "./ListarVendas.css";

function ListarVendas() {
  const [vendas, setVendas] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarVendas = async () => {
      try {
        const dados = await listarVendas();
        setVendas(dados);

        const totalVendas = dados.reduce(
          (acc, v) => acc + v.subtotal,
          0
        );
        setTotal(totalVendas);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
        setMensagem("Erro ao carregar vendas.");
      }
    };

    carregarVendas();
  }, []);

  return (
    <div className="vendas-container">
      <h2>Vendas Realizadas</h2>

      {mensagem && <p className="mensagem erro">{mensagem}</p>}

      {vendas.length === 0 ? (
        <p>Nenhuma venda registrada.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Imagem</th>
              <th>Quantidade</th>
              <th>Preço Unitário</th>
              <th>Subtotal</th>
              <th>Estoque Atual</th>
              <th>Data da Venda</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.produto}</td>
                <td>
                  {venda.imagem ? (
                    <img
                      src={`http://localhost:5000/${venda.imagem}`}
                      alt={venda.produto}
                      className="imagem-produto"
                    />
                  ) : (
                    "Sem imagem"
                  )}
                </td>
                <td>{venda.quantidade_vendida}</td>
                <td>R$ {venda.preco_unitario}</td>
                <td>R$ {venda.subtotal}</td>
                <td>{venda.estoque_atual}</td>
                <td>{venda.data_venda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {vendas.length > 0 && (
        <div className="total-vendas">
          <strong>Total de Vendas:</strong> R$ {total}
        </div>
      )}

      <button className="btn-voltar" onClick={() => navigate("/")}>
        Voltar para Início
      </button>
    </div>
  );
}

export default ListarVendas;
