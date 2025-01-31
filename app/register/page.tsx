"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import logog from "../../public/images/logog.png";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
import Image from "next/image";

import pageStyles from "../page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    // Preciso implementar uma verificação do login.
    // Por agora estou apenas redirecionando para o login.
    router.push(`/`); 
  };

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", cursor: "pointer"}}
            onClick={() => router.push('/')}>
          <Image src={logog} alt="Logo" className={pageStyles.logo} />
        </div>

        <Card headerTitle="Registrar">
          <p style={{ marginBottom: "32px" }}>Crie sua conta!</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleRegister}>
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
            <button type="submit">Registrar</button>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  );
}