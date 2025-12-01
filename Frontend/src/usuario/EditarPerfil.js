import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditarPerfil.css";

function EditarPerfil() {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoArquivo, setFotoArquivo] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (!usuarioLogado) {
      navigate("/login");
      return;
    }

    setNome(usuarioLogado.name);
    setEmail(usuarioLogado.email);
    setCelular(usuarioLogado.celular);

    if (usuarioLogado.foto) {
      setFotoPreview(`http://127.0.0.1:5000/${usuarioLogado.foto}`);
    }
  }, []);

  const handleFotoChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      setFotoArquivo(arquivo);
      setFotoPreview(URL.createObjectURL(arquivo));
    }
  };

  const salvarAlteracoes = async () => {
    if (!usuarioLogado) return;

    const formData = new FormData();
    formData.append("name", nome);
    formData.append("email", email);
    formData.append("celular", celular);

    if (fotoArquivo) {
      formData.append("fotoPerfil", fotoArquivo);
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/users/${usuarioLogado.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const resultado = await response.json();

      if (response.ok) {
        setMensagem("Perfil atualizado com sucesso!");

        // Salva corretamente no localStorage
        const usuarioAtualizado = {
          ...usuarioLogado,
          name: nome,
          email: email,
          celular: celular,
          foto: resultado.user.foto ?? usuarioLogado.foto,
        };

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

        setTimeout(() => navigate("/perfil"), 1000);
      } else {
        setMensagem(resultado.message || "Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error("Erro ao enviar atualização:", error);
      setMensagem("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="editar-perfil-container">
      <h2>Editar Perfil</h2>

      <div className="foto-area">
        <img
          src={fotoPreview || "/default-avatar.png"}
          alt="Foto do usuário"
          className="foto-preview"
        />

        <label className="btn-foto">
          Selecionar nova foto
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </label>
      </div>

      <div className="form-editar">
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Celular:</label>
        <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} />

        <button className="btn-salvar" onClick={salvarAlteracoes}>
          Salvar Alterações
        </button>

        <button className="btn-voltar" onClick={() => navigate("/perfil")}>
          Cancelar
        </button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}

export default EditarPerfil;
