import { useEffect, useState } from "react";
import styles from "./CardPage.module.scss";
import Employee from "./components/EmployeeCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubInfoById } from "@/utils/api";
import Spinner from "@/components/Spinner/Spinner";
import { AppDispatch, RootState } from "@/store";
import { UnknownAction } from "@reduxjs/toolkit";


const Card = () => {
  const address = "ул. Газовая, д. 10";

  const [isOpenMap, setIsOpenMap] = useState(false);
  const [isOpenSchedule, setIsOpenSchedule] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenPromo, setIsOpenPromo] = useState(false);
  const [isOpenExperts, setIsOpenExperts] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const { clubId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const club = useSelector((state: RootState) => state.club.data); //поля о клубе берем тут!
  console.log(club);
  const loading = useSelector((state: RootState) => state.club.loading);
  const error = useSelector((state: RootState) => state.club.error);

  useEffect(() => {
    if (clubId) {
      dispatch(fetchClubInfoById(Number(clubId)) as unknown as UnknownAction);; // Запрашиваем данные о клубе по ID
    }
  }, [clubId, dispatch]);
  
  if (loading) return <div><Spinner /></div>; // Показываем спиннер 
  if (error) return <div>Error: {error}</div>;

  const handleClickIsOpenMap = () => {
    setIsOpenMap(!isOpenMap);
  };

  const handleClickIsOpenSchedule = () => {
    setIsOpenSchedule(!isOpenSchedule);
  };

  const handleClickIsOpenPrice = () => {
    setIsOpenPrice(!isOpenPrice);
  };

  const handleClickIsOpenPromo = () => {
    setIsOpenPromo(!isOpenPromo);
  };

  const handleClickIsOpenExperts = () => {
    setIsOpenExperts(!isOpenExperts);
  };

  const handleClickIsOpenInfo = () => {
    setIsOpenInfo(!isOpenInfo);
  };

  return (
    <section className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header_socials}>
          <img
            className={styles.socials__image}
            src="/images/Mock-img.jpg"
            alt="Card-image"
            width={305}
            height={260}
          />
          <div className={styles.socials__items}>
            <button type="button" className={styles.socials__items_item}>
              telegram
            </button>
            <button type="button" className={styles.socials__items_item}>
              Vk
            </button>
            <button type="button" className={styles.socials__items_item}>
              gmail
            </button>
          </div>
        </div>
        <div className={styles.card__header_info}>
          <div className={styles.info__header}>
            <h1 className={styles.info__header_title}>
              Спортивная секция 1 длинное название
            </h1>
            <a href="#">
              <img src="/svg/Share.svg" alt="Share" width={24} height={24} />
            </a>
          </div>
          <div className={styles.info__address}>
            <p className={styles.info__address_text}>{address}</p>
            <div className={styles.info__address_metro}>
              <img src="/svg/М.svg" alt="Metro" width={20} height={24} />
              <p className={styles.info__address_metro_name}>Петроградская</p>
            </div>
          </div>
          <div className={styles.info__time}>
            <p className={styles.info__time_title}>Режим работы</p>
            <div className={styles.info__time_items}>
              <p className={styles.info__time_items_text}>
                Пн-Пт 15.00 - 21.00
              </p>
              <p className={styles.info__time_items_text}>
                Пн-Пт 15.00 - 21.00
              </p>
            </div>
          </div>
          <p className={styles.info__description}>
            *точное время занятий уточняйте у представителя организации
          </p>
          <button className={styles.header__btn}>
            <img src="/svg/Phone.svg" alt="Phone" width={24} height={24} />
            <p>Телефоны</p>
          </button>
          <a className={styles.header__link} href="#">
            Нашли несоответсвие данных, сообщите нам
          </a>
          <div className={styles.info__block}>
            Бесплатное пробное занятие и скидки в Секция 1. 12 залов в СПб.
            Игровая форма проведения занятий. Тренеры – профессионалы высокого
            уровня. Укрепление здоровья детей, подготовка к спортивным секциям.
          </div>
        </div>
      </div>
      <p className={styles.card__description}>
        Какая-то информмация о секции маленькая бесплатная
      </p>
      <ul className={styles.card__list}>
        <li className={styles.card__list_item}>
          <img src="/svg/Union.svg" alt="Union" width={24} height={24} />
          <p>Медработник в центре</p>
        </li>
        <li className={styles.card__list_item}>
          <img src="/svg/Parking.svg" alt="Парковка" width={24} height={24} />
          <p>Парковка</p>
        </li>
        <li className={styles.card__list_item}>
          <img src="/svg/Key.svg" alt="Key" width={24} height={24} />
          <p>Безопасные раздевалки</p>
        </li>
      </ul>
      <div className={styles.card__buttons}>
        <button
          type="button"
          className={`${styles.card__buttons_btn} ${
            isOpenMap ? styles.active : ""
          }`}
          onClick={handleClickIsOpenMap}
        >
          Карта
        </button>
        <button
          type="button"
          className={`${styles.card__buttons_btn} ${
            isOpenSchedule ? styles.active : ""
          }`}
          onClick={handleClickIsOpenSchedule}
        >
          Расписание
        </button>
        <button
          type="button"
          className={`${styles.card__buttons_btn} ${
            isOpenPrice ? styles.active : ""
          }`}
          onClick={handleClickIsOpenPrice}
        >
          Цены
        </button>
        <button
          type="button"
          className={`${styles.card__buttons_btn} ${
            isOpenPromo ? styles.active : ""
          }`}
          onClick={handleClickIsOpenPromo}
        >
          Акции
        </button>
        <button
          type="button"
          className={`${styles.card__buttons_btn} ${
            isOpenExperts ? styles.active : ""
          }`}
          onClick={handleClickIsOpenExperts}
        >
          Наши специалисты
        </button>
        <button
          type="button"
          className={`${styles.card__buttons_btn} ${
            isOpenInfo ? styles.active : ""
          }`}
          onClick={handleClickIsOpenInfo}
        >
          Общая информация
        </button>
      </div>
      {isOpenMap && (
        <div className={styles.card__map}>
          <h3 className={styles.card__map_title}>Карта</h3>
          <p>
            Наш адрес:<span>{address}</span>
          </p>
          <img
            src="/images/Mock-map.jpg"
            alt="Close"
            width={827}
            height={611}
          />
        </div>
      )}
      {isOpenSchedule && (
        <div className={styles.card__schedule}>
          <h3 className={styles.card__schedule_title}>Расписание</h3>
          <img
            src="/images/Mock-list.jpg"
            alt="Schedule"
            width={1306}
            height={266}
          />
        </div>
      )}
      {isOpenPrice && (
        <div className={styles.card__price}>
          <h3 className={styles.card__price_title}>Цены</h3>
          <div className={styles.card__price_items}>
            <div>
              <button type="button" className={styles.card__price_btn}>
                Разовые занятия
              </button>
              <p className={styles.card__price_text}>
                первое занятие: бесплатно
              </p>
              <p className={styles.card__price_text}>60 мин: 500 ₽</p>
              <p className={styles.card__price_text}>120 мин: 1 000 ₽</p>
            </div>
            <div>
              <button type="button" className={styles.card__price_btn}>
                Абонементы
              </button>
              <p className={styles.card__price_text}>
                безлимитный 3 месяца: 3 000 ₽{" "}
              </p>
              <p className={styles.card__price_text}>
                безлимитный на 6 месяцев: 5 000 ₽
              </p>
              <p className={styles.card__price_text}>
                безлимитный на 12 месяцев: 10 000 ₽
              </p>
            </div>
          </div>
        </div>
      )}
      {isOpenPromo && (
        <div className={styles.card__promo}>
          <h3 className={styles.card__promo_title}>Акции</h3>
          <ul className={styles.card__promo_list}>
            <li className={styles.card__promo_item}>
              Первое пробное занятие - бесплатно
            </li>
            <li className={styles.card__promo_item}>
              День рождения - (если в течение курса у ученика будет день
              рождения): на этот курс -10%
            </li>
            <li className={styles.card__promo_item}>
              За рекомендацию: если клиент приходит по вашей рекомендации и
              оплачивает индивидуально 6 занятий, ученик, порекомендовавший нашу
              школу, получает единовременно скидку -10 %
            </li>
            <li className={styles.card__promo_item}>
              Новичку по рекомендации - новый ученик, пришедший по рекомендации,
              получает скидку на один курс -5%
            </li>
            <li className={styles.card__promo_item}>
              Пара (а также трое и больше) занимающихся, записавшихся вместе
              получают скидку -5% за каждый абонемент постоянно. Если из пары
              (группы) остается один человек, скидка перестает действовать
            </li>
          </ul>
        </div>
      )}
      {isOpenExperts && (
        <div className={styles.card__experts}>
          <h3 className={styles.card__experts_title}>Наши специалисты</h3>
          <div className={styles.card__experts_items}>
            <Employee />
            <Employee />
            <Employee />
            <Employee />
            <Employee />
            <Employee />
            <Employee />
            <Employee />
          </div>
        </div>
      )}
      {isOpenInfo && (
        <div className={styles.card__info}>
          <h3 className={styles.card__info_title}>Общая информация</h3>
          <p className={styles.card__info_text}>
            Школа плавания Mevis c 1999 года обучает плаванию взрослых и детей,
            в группе и индивидуально. Плавательный клуб Mevis работает на основе
            методики обучения плаванию, разработанной в 1987 г. на базе
            «Государственного центрального института физической культуры» (ныне
            «РГУФК»). Эта методика обучения плаванию была создана выпускником
            тренерского факультета института (специализация - плавание) -
            Воробьевым К.В., под руководством профессора кафедры плавания,
            кандидата педагогических наук Афанасьева В.З. С тех пор школа
            плавания открыла много филиалов, также занимаемся обучением плаванию
            взрослых и в Минске. Работает сеть бассейнов.
          </p>
        </div>
      )}
      <div className={styles.card__footer}>
        <button className={styles.card__footer_btn}>
          <img src="/svg/Phone.svg" alt="Phone" width={24} height={24} />
          <p>Телефоны</p>
        </button>
        <div className={styles.card__footer_socials_items}>
          <button
            type="button"
            className={styles.card__footer_socials_items_item}
          >
            telegram
          </button>
          <button
            type="button"
            className={styles.card__footer_socials_items_item}
          >
            Vk
          </button>
          <button
            type="button"
            className={styles.card__footer_socials_items_item}
          >
            gmail
          </button>
        </div>
        <div className={styles.card__footer_share}>
          <p>Отправить ссылку на секцию</p>
          <a href="#">
            <img src="/svg/Share.svg" alt="Share" width={24} height={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Card;
