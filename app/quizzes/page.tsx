"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
import pageStyles from "./quizzes.style.module.css";
import logog from "../../public/images/logog.png";

const quizzes = [
  { id: 1, title: "Quiz sobre Geografia", slug: "geography" },
  { id: 2, title: "Quiz sobre História", slug: "history" },
  { id: 3, title: "Quiz sobre Ciências", slug: "science" },
  { id: 4, title: "Quiz sobre Academia", slug: "gym" },
];

export default function QuizzesPage() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPlayerName(localStorage.getItem("playerName") || "");
    }
  }, []);

  const handleQuizSelect = (quizSlug: string) => {
    router.push(`/game?quiz=${quizSlug}&player=${playerName}`);
  };

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: "24px", cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <img src={logog.src} alt="Logo" className={pageStyles.logo} />
        </div>
        <Card headerTitle="Teste os seus conhecimentos!">
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {quizzes.map((quiz) => (
              <li key={quiz.id} style={{ marginBottom: "16px" }}>
                <button onClick={() => handleQuizSelect(quiz.slug)} style={{ width: "100%" }}>
                  {quiz.title}
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Footer />
      </section>
    </main>
  );
}
