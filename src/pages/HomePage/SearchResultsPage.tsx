import styles from "./HomePage.module.scss";
// import InputBar from "../../components/UI/Input/InputBar";
import { mockMoreSections } from "../../mocks";
import { useState } from "react";
import {clubs} from "@/store/searchSlice";
import Filters from "@/components/Filters";
import SportSections from "@/components/SportSections";
import { useAppSelector } from "@/hooks/redux";
// import {ClubMapMarkers} from "@/components/Map/MapCommon";

const SearchResultsPage: React.FC = () => {
  
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);
  const clubsList = useAppSelector(clubs);//это список клубов для отображения на странице
  // const error = useAppSelector(state => state.search.error);
  console.log(clubsList);
 //компонент карты -это ClubMapMarkers. Там ширина в процентах. можно отрегулировать
  

  return (
    
      <section className={styles.inner}>
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
      </section>
  );
};

export default SearchResultsPage;
