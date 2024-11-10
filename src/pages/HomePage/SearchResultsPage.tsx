import { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import SportSections from "@/components/SportSections";
import { useAppSelector } from "@/hooks/redux";
import MapCommon from "../../components/Map/MapCommon";
import Forms from "@/components/Forms/SearchMainForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Spinner from "@/components/Spinner/Spinner";
import styles from "./HomePage.module.scss";
import getWordForm from "@/utils/getAllClubCountWordForm";

const SearchResultsPage: React.FC = () => {
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);
  const clubsList = useAppSelector((state) => state.search.clubs);
  const loading = useSelector((state: RootState) => state.search.loading);
  const isOpen = useAppSelector((state) => state.sports.isOpen);
  const isAutosuggestOpen = useAppSelector((state) => state.search.isAutosuggestOpen);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <section className={styles.inner}>
      {location.pathname === "/searchresults" && isOpen && (
        <div className={styles.overlay} />
      )}
        {location.pathname === "/searchresults" && isAutosuggestOpen && (
        <div className={styles.overlay} />
      )}
      <div className={styles.form}>
        <Forms />
      </div>
      {clubsList.length === 0 && (
        <div className={styles.inner__notFound}>
          <h1>Ничего не найдено, попробуйте изменить запрос</h1>
        </div>
      )}
      <div className={styles.inner__info}>
        <div className={styles.inner__filters}>
          <div className={styles.inner__filterControls}>
            {clubsList.length > 0 && (
              <div className={styles.inner__allInfos}>
                <h1>Мы нашли {getWordForm(clubsList.length, "секция")}</h1>
              </div>
            )}
          </div>
          {isOpenFilters && <Filters />}
          <SportSections />
        </div>
        <div className={styles.map}>
          {clubsList.length > 0 && <MapCommon />}
        </div>
      </div>
    </section>
  );
};

export default SearchResultsPage;
