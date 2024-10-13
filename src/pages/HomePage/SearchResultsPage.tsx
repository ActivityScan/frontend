import styles from "./HomePage.module.scss";
// import InputBar from "../../components/UI/Input/InputBar";
//import { mockMoreSections } from "../../mocks";
import { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import SportSections from "@/components/SportSections";
import { useAppSelector } from "@/hooks/redux";
import MapCommon from "../../components/Map/MapCommon";
import Forms from "@/components/Forms/SearchMainForm";
import getClubCountWordForm from "@/utils/getAllClubCountWordForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Spinner from "@/components/Spinner/Spinner";

const SearchResultsPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);
  const clubsList = useAppSelector((state) => state.search.clubs); //это список клубов для отображения на странице
  // const error = useAppSelector(state => state.search.error);
  console.log("clubs", clubsList);
  const loading = useSelector((state: RootState) => state.search.loading);
  //компонент карты -это ClubMapMarkers. Там ширина в процентах. можно отрегулировать

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // if (scrollPosition < 200) {
      //   setScrolled(false);
      // } else {
      //   setScrolled(true);
      // }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    ); // Показываем спиннер
  // if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.inner}>
      {isOpenFilters ? (
        <>
          <div className={styles.form}>
            <Forms />
          </div>
          <button
            className={styles.inner__btn}
            type="button"
            onClick={() => setIsOpenFilters(!isOpenFilters)}
          >
            Скрыть дополнительные фильтры
          </button>
        </>
      ) : (
        <>
          <div className={styles.form}>
            <Forms />
          </div>
          <button
            className={styles.inner__btn}
            type="button"
            onClick={() => setIsOpenFilters(!isOpenFilters)}
          >
            Показать дополнительные фильтры
          </button>
        </>
      )}
      {clubsList.length ? (
        <div className={styles.inner__allInfos}>
          <h1>
            Мы нашли {clubsList.length} {getClubCountWordForm(clubsList.length)}{" "}
            по вашему запросу
          </h1>
        </div>
      ) : (
        ""
      )}
      <div className={styles.inner__info}>
        <div className={styles.inner__filters}>
          <div className={styles.inner__content}>
            {isOpenFilters && <Filters />}
            <SportSections />
          </div>
        </div>
        <div className={`${styles.map} ${scrolled ? styles.scrolled : ""}`}>
          {clubsList.length > 0 && <MapCommon />}
        </div>
      </div>
    </section>
  );
};

export default SearchResultsPage;
