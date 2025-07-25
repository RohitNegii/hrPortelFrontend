import styles from "./AuthLayout.module.css";
import loginImg from "../../assets/login.png";  // correct path

const AuthLayout = ({ children }) => {
  return (
        <div className={styles.mainWrapper}>

    <div className={styles.container}>
      <div className={styles.left}>
        <img src={loginImg} alt="Dashboard" className={styles.image} />
        <h2>Lorem ipsum dolor sit amet, consectetur.</h2>
        <p>
          Integer facilisis, metus eu eleifend commodo, elit nisi ultrices ex,
          ut vehicula lorem lorem nec nulla.
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.formBox}>{children}</div>
      </div>
    </div>
    </div>
  );
};

export default AuthLayout;
