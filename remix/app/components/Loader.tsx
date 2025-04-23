
import styles from "../styles/loader.module.css";

export const Loader = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={`${styles.ring} ${styles.ring1}`}></div>
      <div className={`${styles.ring} ${styles.ring2}`}></div>
      <div className={`${styles.ring} ${styles.ring3}`}></div>
      <div className={styles.ring}></div>
    </div>
  </div>
);