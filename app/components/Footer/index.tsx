import { AluraLogo } from "../AluraLogo/AluraLogo";
import footerStyles from "./footer.module.css";

export function Footer(){
    return (
    <footer className={footerStyles.footer}>
        <AluraLogo/>
            <p>
                Orgulhosamente criado por<br/> Hierro Pagotto
            </p>
  </footer>
    )
}