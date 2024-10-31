import styles from "./HomePage.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import SearchMainForm from "../../components/Forms/SearchMainForm";
import { fetchSportTypes } from "@/utils/api";
import { AnyAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store";

const Home: React.FC = () => {

  const dispatch: AppDispatch = useAppDispatch();
  const sportTypes = useAppSelector((state) => state.search.sportTypes);

  //получение списка спорта
  useEffect(() => {
    const fetchSportTypesAsync = async () => {
      try {
        dispatch(fetchSportTypes() as unknown as AnyAction);
        // unwrapResult(actionResult); 
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchSportTypesAsync();
  }, [dispatch]);

console.log(sportTypes);

  return (
    // <section className={styles.home}>
    //   <h1 className={styles.home__title}>Поиск спортивных секций в СПБ</h1>
    //   <p className={styles.home__text}>
    //     Сервис находится в разработке. Сейчас мы работаем с секциями плавания,
    //     единоборств и гимнастики.
    //   </p>
    //   <SearchMainForm />
    // </section>
    <>
    <section className={styles.home}>
      <h1 className={styles.home__title}>Поиск спортивных секций в СПБ</h1>
      <p className={styles.home__text}>
        Сервис находится в разработке. Сейчас мы работаем с секциями плавания,
        единоборств и гимнастики.
      </p>
      <SearchMainForm />
    </section>
    <button type="button" className={styles.telegram}>
      <img
        src="icons/telegram_page_01.svg"
        alt="telegram"
        width={96}
        height={96}
      />
    </button>
  </>

  );
};

export default Home;
