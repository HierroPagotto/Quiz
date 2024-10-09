import styles from "./style.module.css";

interface AlternativeProps {
  label: string;
  order: number;
  onSelect: (order: number) => void;}

export function Alternative(props: AlternativeProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      props.onSelect(props.order);
    }
  };

  return (
    <label
      className={styles.component}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <input
        type="radio"
        name="alternative"
        id={`alternative-${props.order}`}
        defaultValue={props.order}
        onChange={() => props.onSelect(props.order)}
      />
      {props.label}
    </label>
  );
}
