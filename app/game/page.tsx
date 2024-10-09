"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import logog from "../../public/images/logog.png";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import pageStyles from "../page.module.css";
import config from "../../config.json";
import { Alternative } from "../components/Alternative";

const questions = config.questions;

const answerStates = {
  DEFAULT: "DEFAULT",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export default function GameScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [answerState, setAnswerState] = React.useState<keyof typeof answerStates>(answerStates.DEFAULT);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState([]);
  const questionNumber = currentQuestion + 1;
  const question = questions[currentQuestion];
  const isLastQuestion = questionNumber === questions.length;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const playerName = queryParams.get("player");
    if (playerName) {
      setName(playerName);
      localStorage.setItem("playerName", playerName);
    }
  }, []);

  useEffect(() => {
    if (isLastQuestion) {
      const totalPoints = userAnswers.reduce((_totalPoints, currentAnswer) => {
        if (currentAnswer === true) return _totalPoints + 1;
        return _totalPoints;
      }, 0);

      localStorage.setItem("correctAnswers", totalPoints.toString());

      router.push("/result");
      return;
    }
  }, [userAnswers]);

  return (
    <main
      className={pageStyles.screen}
      style={{
        flex: 1,
        backgroundImage: `url("${question.image}")`,
      }}
    >
      <section className={pageStyles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px"
          }}
          onClick={() => router.push('/')}
          >
            <img src={logog.src} alt="Logo" className={pageStyles.logo} style={{ cursor: 'pointer' }} />
          </div>
        <Card
          headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}
        >
          <h1>
            {question.title}
          </h1>
          <p>
            {question.description}
          </p>
          <form
            style={{
              marginTop: "24px",
            }}
            onSubmit={(event) => {
              event.preventDefault();
              const $questionInfo = event.target as HTMLFormElement;
              const formData = new FormData($questionInfo);
              const { alternative } = Object.fromEntries(formData.entries());

              const isCorrectAnswer = alternative === question.answer;
              if (isCorrectAnswer) {
                setUserAnswers([
                  ...userAnswers,
                  true
                ]);
                setAnswerState(answerStates.SUCCESS);
              }
              if (!isCorrectAnswer) {
                setUserAnswers([
                  ...userAnswers,
                  false
                ]);
                setAnswerState(answerStates.ERROR);
              }
              setTimeout(() => {
                if (isLastQuestion) return;

                setCurrentQuestion(currentQuestion + 1);
                setAnswerState(answerStates.DEFAULT);
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
              {answerState === answerStates.ERROR && (
                "❌"
              )}
              {answerState === answerStates.SUCCESS && (
                "✅"
              )}
            </p>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  );
}