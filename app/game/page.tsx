"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import logog from "../../public/images/logog.png";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import pageStyles from "../page.module.css";
import config from "../../config.json";
import { Alternative } from "../components/Alternative";

const questionsConfig = {
  geography: config.geographyQuestions,
  history: config.historyQuestions,
  science: config.scienceQuestions,
  gym: config.gymQuestions,
};

const answerStates = {
  DEFAULT: "DEFAULT",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export default function GameScreen() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <GameContent />
    </Suspense>
  );
}

function GameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizType = searchParams.get("quiz") as keyof typeof questionsConfig;
  const questions = questionsConfig[quizType] || [];

  const [name, setName] = useState("");
  const [answerState, setAnswerState] = useState<keyof typeof answerStates>(answerStates.DEFAULT);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const questionNumber = currentQuestion + 1;
  const question = questions.length > 0 ? questions[currentQuestion] : null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const playerName = searchParams.get("player") || localStorage.getItem("playerName");
      if (playerName) {
        setName(playerName);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentQuestion >= questions.length && userAnswers.length === questions.length) {
      const totalPoints = userAnswers.reduce((total, currentAnswer) => total + (currentAnswer ? 1 : 0), 0);
      if (typeof window !== "undefined") {
        localStorage.setItem("correctAnswers", totalPoints.toString());
      }
      router.push("/result");
    }
  }, [userAnswers, currentQuestion, questions.length, router]);

  if (!question) {
    return <p>Carregando perguntas...</p>;
  }

  return (
    <main className={pageStyles.screen} style={{ flex: 1, backgroundImage: `url("${question.image}")` }}>
      <section className={pageStyles.container}>
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: "24px", cursor: "pointer" }}
          onClick={() => router.push('/')}>
          <Image src={logog} alt="Logo" className={pageStyles.logo} style={{ cursor: "pointer" }} />
        </div>
        <Card headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}>
          <h1>{question.title}</h1>
          <p>{question.description}</p>
          <form
            style={{ marginTop: "24px" }}
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.target as HTMLFormElement);
              const alternative = formData.get("alternative") as string;
              const isCorrectAnswer = alternative === question.answer;

              setUserAnswers([...userAnswers, isCorrectAnswer]);
              setAnswerState(isCorrectAnswer ? answerStates.SUCCESS : answerStates.ERROR);

              setTimeout(() => {
                if (currentQuestion + 1 >= questions.length) {
                  const totalPoints = userAnswers.reduce((total, currentAnswer) => total + (currentAnswer ? 1 : 0), 0) + (isCorrectAnswer ? 1 : 0);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("correctAnswers", totalPoints.toString());
                  }
                  router.push("/result");
                } else {
                  setCurrentQuestion(currentQuestion + 1);
                  setAnswerState(answerStates.DEFAULT);
                }
              }, 2000);
            }}
          >
            {question.alternatives.map((alternative, index) => (
              <div key={alternative + index} style={{ marginBottom: "8px" }}>
                <Alternative
                  label={alternative}
                  order={index}
                  onSelect={(order) => {
                    const selectedAlternative = `alternative-${order}`;
                    const input = document.getElementById(selectedAlternative) as HTMLInputElement;
                    if (input) {
                      input.checked = true;
                    }
                  }}
                />
              </div>
            ))}
            {answerState === answerStates.DEFAULT && <button>Confirmar</button>}
            <p style={{ textAlign: "center" }}>
              {answerState === answerStates.ERROR && "❌"}
              {answerState === answerStates.SUCCESS && "✅"}
            </p>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  );
}
