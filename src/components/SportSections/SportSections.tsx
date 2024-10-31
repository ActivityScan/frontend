import { useState } from "react";
import SportSectionItem from "./SportSectionItem";
import styles from "./SportSections.module.scss";
import vektor from "../../assets/Vector.png"
import { clubs } from "@/store/searchSlice";
import { useAppSelector } from "@/hooks/redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SportSections = () => {
  const [parent] = useAutoAnimate();
  const [more, setMore] = useState(false);
  // Fetch the list of clubs from the Redux store
  const clubsList = useAppSelector(clubs);
  // Check if clubsList is defined and has items
  if (!clubsList || clubsList.length === 0) {
    return <div></div>; // Handle empty state
  }
  return (
    <section className={styles.section} ref={parent}>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button>
        дополнительные фильтры
        <img src={vektor} alt="vektor"  className={styles.vektor}/>
            </button> 
            <button> 
               По расстоянию
          <img src="/svg/Sort.svg" alt="sort" />
        
        </button>
        </div>
       
        <div>
          {more
            ? clubsList.map((club: any) => (
                <SportSectionItem key={club.id} mockSportSectionItem={club} />
              ))
            : clubsList
                .slice(0, 3)
                .map((club: any) => (
                  <SportSectionItem key={club.id} mockSportSectionItem={club} />
                ))}
        </div>
      </div>
      <button
        className={styles.btn}
        onClick={() => setMore((prevMore) => !prevMore)}
      >
   {clubsList.length > 3 && (more ? "Показать меньше" : "Показать ещё")}
      </button>
    </section>
  );
};

export default SportSections;
