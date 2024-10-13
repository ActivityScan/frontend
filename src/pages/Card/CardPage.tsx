import { useEffect, useState } from "react";
import styles from "./CardPage.module.scss";
import Employee from "./components/EmployeeCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubInfoById } from "@/utils/api";
import Spinner from "@/components/Spinner/Spinner";
import { AppDispatch, RootState } from "@/store";
import { UnknownAction } from "@reduxjs/toolkit";
// import MapCommon from "@/components/Map/MapCommon";
import VideoPlayer from "@/utils/VideoPlayer";
import { useAppSelector } from "@/hooks/redux";
import { clubs} from "@/store/searchSlice";

const Card = () => {
  const [isOpenPhone, setIsOpenPhone] = useState(false);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const clubsList = useAppSelector(clubs);
  const { clubId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const club = useSelector((state: RootState) => state.club.data); //поля о клубе берем тут!
  // console.log(club);
  const loading = useSelector((state: RootState) => state.club.loading);
  const error = useSelector((state: RootState) => state.club.error);
  // const distance = useSelector()
  const latitude = useSelector((state: RootState)  => state.search.latitude);
 const longitude = useSelector((state: RootState) => state.search.longitude);
 const [userDistance, setUserDistance] = useState<number | null>(null);

console.log(latitude, longitude)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition >= 300) {
        setIsBackButtonVisible(true);
      } else {
        setIsBackButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    if (clubId) {
      dispatch(fetchClubInfoById(Number(clubId)) as unknown as UnknownAction); // Запрашиваем данные о клубе по ID
    }
  }, [clubId, dispatch]);

  useEffect(() => {
    if (club && latitude !== null && longitude !== null) {
      const foundClub = clubsList.find((club: { id: string | undefined; }) => club.id == clubId);
      if (foundClub) {
        setUserDistance(foundClub.distance);
      } else {
        console.error('Club not found or coordinates are not set');
      }
    }
  }, [club, clubsList, clubId, latitude, longitude]);

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    ); // Показываем спиннер
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.card} id="home">
      <button
        className={`${styles.card__back_button} ${
          isBackButtonVisible ? styles.visible : ""
        }`}
        type="button"
        onClick={() => window.scrollTo(0, 0)}
      >
        Наверх
      </button>
      <div className={styles.card__header}>
        <div className={styles.card__header_socials}>
          <img
            className={styles.card__header_socials_image}
            src="/images/test.png"
            alt="Card-image"
            width={305}
            height={260}
          />
          {/* <div className={styles.card__header_socials_items}>
            <button type="button" className={styles.card__header_socials_items_item}>
              telegram
            </button>
            <button type="button" className={styles.card__header_socials_items_item}>
              Vk
            </button>
            <button type="button" className={styles.card__header_socials_items_item}>
              gmail
            </button>
          </div> */}
        </div>
        <div className={styles.card__header_info}>
          <div className={styles.card__header_info_name}>
            <h1 className={styles.card__header_info_name_title}>
              {club?.name}
            </h1>
            <a href="#">
              <img
                src="/svg/Share.svg"
                alt="Share"
                width={24}
                height={24}
                style={{ marginTop: "16px" }}
              />
            </a>
          </div>
          <p className={styles.card__header_info_owner}>Вы владелец?</p>
          <div className={styles.card__header_info_address}>
            <p className={styles.card__header_info_address_text}>
              {club?.address}
            </p>
          </div>
          <div className={styles.card__header_info_transit}>
            <p className={styles.card__header_info_transit_distance}>
            {/* {club.distance} км от вашего адреса */}
            {userDistance !== null ? `${(userDistance / 1000).toFixed(1)} км от вашего адреса` : ''}
            </p>
            <div className={styles.card__header_info_transit_metro}>
              <img src="/svg/М.svg" alt="Metro" width={20} height={24} />
              <p className={styles.card__header_info_transit_metro_name}>
                Петроградская
              </p>
            </div>
          </div>
          <div className={styles.card__header_info_time}>
            <p className={styles.card__header_info_time_title}>Время работы:</p>
            <div className={styles.card__header_info_time_items}>
              <p className={styles.card__header_info_time_items_text}>
                Пн- Вс 09.00 - 21.00
              </p>
            </div>
          </div>
          {/* <p className={styles.card__header_info_description}>
            *точное время занятий уточняйте у представителя организации
          </p> */}
          <button
            className={styles.card__header_info_btn}
            onClick={() => setIsOpenPhone(!isOpenPhone)}
          >
            {isOpenPhone ? (
              `${club?.phoneNumbers[0].phoneNumber}`
            ) : (
              <>
                <img src="/svg/Phone.svg" alt="Phone" width={24} height={24} />
                Телефон
              </>
            )}
          </button>
          <a className={styles.card__header_info_link} href="#">
            Сообщить о несоответствии данных
          </a>
          <div className={styles.card__header_info_block}>
            Бесплатное пробное занятие и скидки в Секция 1. 12 залов в СПб.
            Игровая форма проведения занятий. Тренеры – профессионалы высокого
            уровня. Укрепление здоровья детей, подготовка к спортивным секциям.
          </div>
        </div>
      </div>
      <ul className={styles.card__list}>
        <li className={styles.card__list_item}>
          <img src="/svg/SAFE.svg" alt="key" width={32} height={32} />
        </li>
        <li className={styles.card__list_item}>
          <img src="/svg/Med.svg" alt="med" width={32} height={32} />
        </li>
        <li className={styles.card__list_item}>
          <img src="/svg/Parking.svg" alt="Parking" width={16} height={20} />
        </li>
        <li className={styles.card__list_item}>
          <img src="/svg/wi-fi.svg" alt="wi-fi" width={32} height={32} />
        </li>
        <li className={styles.card__list_item}>
          <img src="/svg/1_free.svg" alt="1 free" width={80} height={20} />
        </li>
      </ul>
      <p className={styles.card__description}>
        Детский бассейн грудничкового и раннего плавания в ТК "Парнас" от 0 до
        10 лет. У каждого ребенка есть свой персональный инструктор и план
        тренировок. Мы провели более 203 700 тренировок. каждого ребенка есть
        свой персональный инструктор и план тренировок. Мы провели более 203 700
        тренировок.
      </p>
      <div className={styles.card__buttons}>
        <a
          href="#map"
          className={styles.card__buttons_btn}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          Карта
        </a>
        <a href="#schedule" className={styles.card__buttons_btn}>
          Расписание
        </a>
        <a href="#price" className={styles.card__buttons_btn}>
          Цены
        </a>
        <a href="#promo" className={styles.card__buttons_btn}>
          Акции
        </a>
        <a href="#experts" className={styles.card__buttons_btn}>
          Наши специалисты
        </a>
        <a href="#info" className={styles.card__buttons_btn}>
          Общая информация
        </a>
      </div>

      <div className={styles.card__map} id="map">
        <h3 className={styles.card__map_title}>Карта</h3>
        <p>
          Наш адрес:<span>{club?.address}</span>
        </p>
        {isPlaying && <VideoPlayer />}
        {/* <MapCommon /> */}
      </div>

      <div className={styles.card__schedule} id="schedule">
        <h3 className={styles.card__schedule_title}>Расписание</h3>
        <img
          src="/images/Mock-list.jpg"
          alt="Schedule"
          width={1306}
          height={266}
        />
      </div>

      <div className={styles.card__price} id="price">
        <h3 className={styles.card__price_title}>Цены</h3>
        <div className={styles.card__price_items}>
          <div>
            <button type="button" className={styles.card__price_btn}>
              Разовые занятия
            </button>
            <p className={styles.card__price_text}>первое занятие: бесплатно</p>
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

      <div className={styles.card__promo} id="promo">
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

      <div className={styles.card__experts} id="experts">
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

      <div className={styles.card__info} id="info">
        <h3 className={styles.card__info_title}>Общая информация</h3>
        <p className={styles.card__info_text}>
          Школа плавания Mevis c 1999 года обучает плаванию взрослых и детей, в
          группе и индивидуально. Плавательный клуб Mevis работает на основе
          методики обучения плаванию, разработанной в 1987 г. на базе
          «Государственного центрального института физической культуры» (ныне
          «РГУФК»). Эта методика обучения плаванию была создана выпускником
          тренерского факультета института (специализация - плавание) -
          Воробьевым К.В., под руководством профессора кафедры плавания,
          кандидата педагогических наук Афанасьева В.З. С тех пор школа плавания
          открыла много филиалов, также занимаемся обучением плаванию взрослых и
          в Минске. Работает сеть бассейнов.
        </p>
      </div>

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
