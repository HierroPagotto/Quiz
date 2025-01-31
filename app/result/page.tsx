"use client";
import React from "react";
import { useRouter } from "next/navigation";
import logog from "../../public/images/logog.png";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import pageStyles from "./result.style.module.css";
import Image from "next/image";

export default function ResultScreen() {
  const router = useRouter();
  const [playerName, setPlayerName] = React.useState("");
  const [correctAnswers, setCorrectAnswers] = React.useState(0);

  React.useEffect(() => {
    const name = localStorage.getItem("playerName") || "Jogador";
    const answers = localStorage.getItem("correctAnswers") || "0";

    setPlayerName(name);
    setCorrectAnswers(parseInt(answers, 10));
  }, []);

  return (
    <main className={pageStyles.screen}>
      <section className={pageStyles.container}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", cursor: "pointer"}}
            onClick={() => router.push('/')}>
          <Image src={logog} alt="Logo" className={pageStyles.logo} />
        </div>
        <Card headerTitle="Resultado do Quiz">
          <h1>{playerName}, você acertou {correctAnswers} respostas!</h1>
          <button onClick={() => router.push("/")}>Voltar ao Início</button>
        </Card>
        <Footer />
      </section>
    </main>
  );
}
