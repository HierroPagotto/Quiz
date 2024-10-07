"use client";

import { useRouter } from "next/navigation";

import { AluraQuizLogo } from "./components/AluraquizLogo";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";

import pageStyles from "./page.module.css";

export default function Page() {
  const router = useRouter();

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px"
          }}
        >
          <AluraQuizLogo />
        </div>

        <Card
          headerTitle="Teste seus conhecimentos!"
        >
          <p style={{ marginBottom: "32px" }}>
            Teste os seus conhecimentos sobre o planeta Terra!
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();


              const name = "";
              router.push(`/game?player=${name}`)
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <input
                id="nome"
                type="text"
                placeholder="Diz aí seu nome pra jogar :)"
                name="playerName"
              />
            </div>
            <button>
              Jogar
            </button>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  )
}