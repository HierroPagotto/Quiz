"use client";
import React from "react";
import{ useRouter } from "next/navigation";

import { AluraQuizLogo } from "../components/AluraquizLogo";
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

export default function GameScreen(){
  const router = useRouter();
  const [answerState, setAnswerState] = React.useState<keyof typeof answerStates>(answerStates.DEFAULT);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionNumber = currentQuestion + 1;
  const [userAnswers, setUserAnswers] = React.useState<boolean[]>([]);
  const question = questions[currentQuestion];
  const isLastQuestion = questionNumber === questions.length;

  return (
    <main className={pageStyles.screen} style={{flex: 1, backgroundImage: `url("${question.image}")`,}}>
      <section className={pageStyles.container}>
      <div
          style={{
            maxWidth:"350px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <AluraQuizLogo />
        </div>
      <Card headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}> 

        <h1>{question.title}</h1>

          <p>{question.description}
          </p>
          
          <form onSubmit={(event) => {
            event.preventDefault();
            const $questionsInfo = event.target as HTMLFormElement;
            const formData = new FormData ($questionsInfo);
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
              if(isLastQuestion){
                const totalPoints = userAnswers.reduce((_totalPoints, currentAnswer) =>{
                  
                  if(currentAnswer === true)return _totalPoints + 1;
                  return _totalPoints;
                }, 0);
                
                alert (`Você concluiu o desafio! E acertou ${totalPoints}`)
                router.push("/");
                return;
              }
              setCurrentQuestion(currentQuestion + 1);
              setAnswerState(answerStates.DEFAULT);
            }, 2000)

            //setCurrentQuestion(currentQuestion + 1)
          }}>

            {question.alternatives.map((alternative, index) =>(
            <Alternative  key={alternative + index}
            label={alternative}
            order={index}/>
            ))}
               {answerState === answerStates.DEFAULT && (
              <button>
                Confirmar
              </button>
            )}
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
      <Footer/>
      </section>
    </main>
  )
}

