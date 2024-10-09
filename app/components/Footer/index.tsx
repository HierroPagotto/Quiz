import logo from "../../../public/images/logo.png"
import footerStyles from "./footer.module.css";

export function Footer(){
    return (
    <footer className={footerStyles.footer}>
        <img src={logo.src} alt="Logo" className={footerStyles.logo}/>
            <p>
                Orgulhosamente criado por<br/> Hierro Pagotto
            </p>
  </footer>
    )
}