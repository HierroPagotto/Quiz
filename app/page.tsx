import pageStyles from "./page.module.css";
import { AluraQuizLogo } from "./components/AluraquizLogo";
import { Footer } from "./components/Footer/index";
import {Card} from "./components/Card";

export default function Page() {
    return (
      <main className={pageStyles.homeScreen} style={{flex: 1}}>
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

          <Card headerTitle="Teste suas habilidade">
          <p style={{marginBottom:"32px"}}>
            Teste os seus conhecimentos sobre o universo Marvel e divirta-se criando o seu Quiz.
              </p>
              <p>
                FORMULARIO / BOTAO
              </p>
                <a href="/game">
                     Jogar
                  </a>
          </Card>
          <Footer/>
          
          </section>
      </main>
    )
  }