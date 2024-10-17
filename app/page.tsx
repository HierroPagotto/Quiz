"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import logog from "../public/images/logog.png";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";

import pageStyles from "./page.module.css";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("playerName", name); // Salva o nome no localStorage
    router.push(`/quizzes?player=${name}`);
  };

  const handleRegister = () => {
    router.push(`/register`);
  };

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <img src={logog.src} alt="Logo" className={pageStyles.logo} />
        </div>

        <Card headerTitle="Login">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <input
                id="nome"
                type="text"
                placeholder="Nome"
                className={pageStyles.inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className={pageStyles.inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <input
                id="senha"
                type="password"
                placeholder="Senha"
                className={pageStyles.inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Entrar</button>
          </form>
          <button id="reg" onClick={handleRegister}>
              Registrar
              </button>
        </Card>
        <Footer />
      </section>
    </main>
  );
}
