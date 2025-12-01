import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AlterarSenha.css";

function AlterarSenha() {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!usuarioLogado) {
      navigate("/login");
    }
  }, []);

  const alterarSenha = async () => {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/users/${usuarioLogado.id}/senha`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senhaAtual: senhaAtual,
            novaSenha: novaSenha,
          }),
        }
      );

      const resultado = await response.json();

      if (response.ok) {
        setMensagem("Senha alterada com sucesso!");

        // Aguarda 1 segundo e volta ao perfil
        setTimeout(() => navigate("/perfil"), 1000);

      } else {
        setMensagem(resultado.message || "Erro ao alterar senha.");
      }

    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      setMensagem("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="alterar-senha-container">
      <h2>Alterar Senha</h2>

      <div className="form-senha">
        <label>Senha atual:</label>
        <input
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
        />

        <label>Nova senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <label>Confirmar nova senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <button className="btn-alterar" onClick={alterarSenha}>
          Salvar Nova Senha
        </button>

        <button className="btn-voltar" onClick={() => navigate("/perfil")}>
          Voltar
        </button>
      </div>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default AlterarSenha;
