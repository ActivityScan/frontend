import styles from "./SportSectionItem.module.scss";
import { useState } from "react";
import swimmer from "../../assets/swimmer.jpeg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
//import { useAppSelector } from "@/hooks/redux";


const SportSectionsItem = (item: {
  mockSportSectionItem: {
    id: number;
    src: string;
    title: string;
    name: string;
    mapSrc: string;
    category: string;
    address: string;
    phoneNumber: string;
    sale: string;
    free: string;
    latitude: number;
    longitude: number;
    sport: { id: number; name: string };
    distance: number;
  };
}) => {
  const [parent] = useAutoAnimate();
  // const navigate = useNavigate();
  const [isOpenPhone, setIsOpenPhone] = useState<boolean>(false);
  const [isOpenCardDesc, setIsOpenCardDesc] = useState<boolean>(false);

  return (
    <section className={styles.container} ref={parent}>
      {isOpenCardDesc ? (
        <div className={styles.altItem}>
          <div className={styles.altItem__inner}>
            <div className={styles.altItem__inner_info}>
              <h3>{item.mockSportSectionItem.name}</h3>
              <div className={styles.altItem__inner_text}>
                <p>{item.mockSportSectionItem.sport.name}</p>
                <p>{item.mockSportSectionItem.address}</p>
              </div>
            </div>
            <button
              className={styles.item__map_btn}
              type="button"
              onClick={() => setIsOpenCardDesc(!isOpenCardDesc)}>
              {isOpenCardDesc ? (
                <img
                  src="/svg/Open-eye.svg"
                  alt="open button"
                  width={24}
                  height={24}
                />
              ) : (
                <img
                  src="/svg/Close-eye.svg"
                  alt="close button"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.item}>
            <img src={swimmer} alt="logo" width={197} height={160} />

            <div className={styles.item__info}>
              <h3
                className={styles.item__info_name}
                onClick={() => {
                  // navigate(`/club/${item.mockSportSectionItem.id}`);
                  window.open(`/club/${item.mockSportSectionItem.id}`, '_blank');
                }}
              >
                {item.mockSportSectionItem.name}
              </h3>
              {item.mockSportSectionItem.distance && 
                typeof item.mockSportSectionItem.distance === 'number' && 
                item.mockSportSectionItem.distance > 0 && (
                  <p>{(item.mockSportSectionItem.distance / 1000).toFixed(1)} км от вашего адреса</p>
              )}
              {/* <p>{(item.mockSportSectionItem.distance / 1000).toFixed(1)} км от вашего адреса</p> */}
               {/* <p>{Math.round(item.mockSportSectionItem.distance)} м от вашего адреса</p> */}
              <p>{item.mockSportSectionItem.sport.name}</p>
              {/* <p>{Math.round(item.mockSportSectionItem.distance)} м</p> */}
              <p>{item.mockSportSectionItem.address}</p>
              <button
                className={styles.item__btn}
                type="button"
                onClick={() => setIsOpenPhone(!isOpenPhone)}
              >
                {isOpenPhone ? (
                  `${item.mockSportSectionItem.phoneNumber}`
                ) : (
                  <>
                    <img
                      src="/svg/Phone.svg"
                      alt="Phone"
                      width={24}
                      height={24}
                    />
                    Телефон
                  </>
                )}
              </button>
            </div>
            <button
              className={styles.item__map_btn}
              type="button"
              onClick={() => setIsOpenCardDesc(!isOpenCardDesc)}
            >
              {isOpenCardDesc ? (
                <img
                  src="/svg/Open-eye.svg"
                  alt="open button"
                  width={24}
                  height={24}
                />
              ) : (
                <img
                  src="/svg/Close-eye.svg"
                  alt="close button"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>
          <div className={styles.container__sale}>
             <p>Скидка по промокоду SportScan</p>
            <p>Бесплатное пробное занятие</p>   
            <div className={styles.container__sale__price}>
               от 1500 ₽ за занятие
            </div>
                   
          </div>
        </>
      )}
    </section>
  )};

export default SportSectionsItem;
