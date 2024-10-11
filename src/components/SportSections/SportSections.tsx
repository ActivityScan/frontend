import SportSectionItem from "./SportSectionItem";
import styles from "./SportSections.module.scss";
import { MOCK_SPORT_SECTION_ITEMS } from "@/mocks";

const SportSections = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <button>
          <img src="/svg/Sort.svg" alt="sort" />
          По расстоянию
        </button>
        <div>
          {MOCK_SPORT_SECTION_ITEMS.map(
            (item: {
              mockSportSectionItem: {
                id: string;
                src: string;
                title: string;
                mapSrc: string;
                category: string;
                address: string;
                telephone: string;
                sale: string;
                free: string;
              };
            }) => (
              <SportSectionItem key={item.mockSportSectionItem.id} {...item} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default SportSections;
