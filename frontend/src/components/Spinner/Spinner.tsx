import styles from "./Spinner.module.css";

const Spinner = ({ color = "#fff", size = "20px" }) => {
  const className = `${styles.loader} ${styles[`size-${size}`]} ${styles[`color-${color}`]}`;
  return (
    <div className={styles.container}>
      <div className={className}>
      </div>
    </div>
  );
};

export default Spinner;