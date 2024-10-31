import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.footer__info}>
        <p className={styles.footer__info_title}>(c) 2024 ООО “СпортСкан”</p>
        <p className={styles.footer__info_text}>
          Все права защищены. Использование материалов с нашего сайта возможно{" "}
          <br />
          только с указанием ссылки на принадлежность к нашему сайту
        </p>
      </div>
      <div className={styles.footer__links}>
        <Link to="/" className={styles.footer__links_item}>
          Правила сервиса
        </Link>
        <Link to="/" className={styles.footer__links_item}>
          Публичная оферта
        </Link>
        <Link to="/" className={styles.footer__links_item}>
          Политика конфиденциальности
        </Link>
        <Link to="/" className={styles.footer__links_item}>
          Пользовательское соглашение
        </Link>
        <Link to="/" className={styles.footer__links_item}>
          Политика обработки и защиты персональных данных
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
