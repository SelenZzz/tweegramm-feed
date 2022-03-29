import styles from './Selector.module.css';

export const Selector = ({
  onChange,
  list,
  placeholder,
  grow,
}: {
  onChange: Function;
  list: JSX.Element[];
  placeholder: string;
  grow: number;
}) => {
  return (
    <div className={styles.container} style={{ flexGrow: grow }}>
      <select defaultValue=" " onChange={(e) => onChange(e.target.value)}>
        {list}
      </select>
      <div className={styles.selectPlaceholder}>{placeholder}</div>
    </div>
  );
};
