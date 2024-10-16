"use client";

import { useRouter } from "next/navigation";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
import pageStyles from "./quizzes.style.module.css";
import logog from "../../public/images/logog.png";

const quizzes = [
  { id: 1, title: "Quiz sobre Geografia" },
  { id: 2, title: "Quiz sobre História" },
  { id: 3, title: "Quiz sobre Ciências" },
];

export default function QuizzesPage() {
  const router = useRouter();

  const handleQuizSelect = (quizId) => {
    const playerName = localStorage.getItem("playerName");
    if (quizId === 1) {
      router.push(`/game?quiz=geography&player=${playerName}`); // Redireciona para o quiz de geografia
    } else if (quizId === 2) {
      router.push(`/game?quiz=history&player=${playerName}`); // Redireciona para o quiz de história
    } else if (quizId === 3) {
      router.push(`/game?quiz=science&player=${playerName}`); // Redireciona para o quiz de ciências
    }
  };

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", cursor: "pointer"}}
            onClick={() => router.push('/')}>
          <img src={logog.src} alt="Logo" className={pageStyles.logo} />
        </div>
        <Card headerTitle="Teste os seus conhecimentos!">
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {quizzes.map((quiz) => (
              <li key={quiz.id} style={{ marginBottom: "16px" }}>
                <button onClick={() => handleQuizSelect(quiz.id)} style={{ width: "100%" }}>
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
