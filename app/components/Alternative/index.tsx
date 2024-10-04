import styles from "./style.module.css";

interface AlternativeProps {
  label: string;
  order: number;
}

export function Alternative(props: AlternativeProps){
  // DESAFIO: Fazer com que ao apertar ENTER ou Espaço a alternativa seja selecionada
  return (
    <label className={styles.component}>
          <input type="radio" 
          name="alternative" 
          id={`alternative-${props.order}`} 
          defaultValue={props.order}/>
            {props.label}
          </label>
  );
}