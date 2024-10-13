import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Link to="/">
          <img src="/svg/Logo2.svg" alt="logo" width={197} height={49} />
        </Link>
        <Link to="/aboutUs" className={styles.header__link}>
          О нас
        </Link>
        <Link to="/info" className={styles.header__link}>
          Партнерам
        </Link>
      </div>
      <div className={styles.header__right}>
        <Link to="/support" className={styles.header__link}>
          Поддержка сайта
        </Link>
        <button className={styles.header__btn} type="button">
          Добавить секцию
        </button>
      </div>
    </header>
  );
};

export default Header;
