import styles from "./HomePage.module.scss";
// import InputBar from "../../components/UI/Input/InputBar";
import { INPUT_PLACEHOLDERS, mockMoreSections } from "../../mocks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { selectSport } from "../../store/sportSlice";
import { Sports } from "../../Types/types";
import { RootState } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { sports } from "../../mocks";
import SportSelector from "../../components/SportDropdown/SportDropdown";
import SearchMainForm from "../../components/Forms/SearchMainForm";
import Filters from "@/components/Filters";
import SportSections from "@/components/SportSections";

const Home: React.FC = () => {
  const [searchValues, setSearchValues] = useState(["", "", "", ""]);

  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // const selectedSport = useAppSelector((state) => state.sport.selectedSport);
  // const selectedSubSport = useAppSelector((state) => state.sport.selectedSubSport);

  const onChangeSearchInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchValues = [...searchValues];
    newSearchValues[index] = event.target.value;
    setSearchValues(newSearchValues);
  };

  const handleSportClick = (sport: string) => {
    dispatch(selectSport(sport));
    setIsOpen(sport === "Водные виды спорта");
  };

  const handleSubSportClick = (subSport: string) => {
    // dispatch(selectSubSport(subSport));
    setIsOpen(false); // Закрываем выпадающее меню после выбора подкатегории
  };

  const handleAddCard = () => {
    setSearchValues([...searchValues, ""]);
    console.log(searchValues);
  };

  return (
    <section className={styles.home}>
      <h1 className={styles.home__title}>Поиск спортивных секций в СПБ</h1>
      <p className={styles.home__text}>
        Сервис находится в разработке. Сейчас мы работаем с секциями плавания,
        единоборств и гимнастики.
      </p>
      <SearchMainForm />
      {/* <form className={styles.home__form}>
        <SportSelector />
        {INPUT_PLACEHOLDERS.map((item, index) => (

    // <>
    //   <h1>Поиск спортивных секций в СПБ</h1>
    //   <p>Какой-то текст, возможно даже длинный текст</p>
    //   <form className={styles.form}>
    //     {INPUT_NAMES.map((item, index) => (

          <InputBar
            key={item.id}
            placeholder={item.placeholder}
            searchValue={searchValues[index]}
            onChangeSearchInput={(e) => onChangeSearchInput(index, e)}
            setSearchValue={(value: string) => {
              const newSearchValues = [...searchValues];
              newSearchValues[index] = value;
              setSearchValues(newSearchValues);
            }}
          />
        ))}

        <button
          type="button"
          className={styles.home__button}
          onClick={() => handleAddCard()}
        >
          <Link to={"/card"}>
            {searchValues.some((item) => item)
              ? "Найти секцию"
              : "Показать все"}
          </Link>

        </button>
      </form> */}
      {/* <section className={styles.inner}>
        {isOpenFilters ? (
          <button
            className={styles.inner__btn}
            type="button"
            onClick={() => setIsOpenFilters(!isOpenFilters)}
          >
            Скрыть дополнительные фильтры
          </button>
        ) : (
          <button
            className={styles.inner__btn}
            type="button"
            onClick={() => setIsOpenFilters(!isOpenFilters)}
          >
            Показать дополнительные фильтры
          </button>
        )}
        <div className={styles.inner__filters}>
          <h1>Мы нашли {mockMoreSections} секции по вашему запросу</h1>
          <div className={styles.inner__content}>
            {isOpenFilters && <Filters />}
            <SportSections />
          </div>
        </div>
      </section> */}
    </section>

    // </>
  );
};

export default Home;
