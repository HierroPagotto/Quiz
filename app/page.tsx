"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AluraQuizLogo } from "./components/AluraquizLogo";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";

import pageStyles from "./page.module.css";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/game?player=${name}`);
  };

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <AluraQuizLogo />
        </div>

        <Card headerTitle="Teste seus conhecimentos!">
          <p style={{ marginBottom: "32px" }}>
            Teste os seus conhecimentos sobre o planeta Terra!
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <input
                id="nome"
                type="text"
                placeholder="Qual seu nome? :)"
                name="playerName"
                className={pageStyles.inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>
            <button type="submit">Jogar</button>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  );
}
