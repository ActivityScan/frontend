import styles from "./SportSectionItem.module.scss";
import { useState } from "react";

const SportSectionsItem = (item: {
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
}) => {
  const [isOpenPhone, setIsOpenPhone] = useState<boolean>(false);
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  return (
    <section className={styles.container}>
      {isOpenMap ? (
        <div className={styles.altItem}>
          <div className={styles.altItem__inner}>
            <div className={styles.altItem__inner_info}>
              <h3>{item.mockSportSectionItem.title}</h3>
              <div className={styles.altItem__inner_text}>
                <p>{item.mockSportSectionItem.category}</p>
                <p>{item.mockSportSectionItem.address}</p>
              </div>
            </div>
            <button
              className={styles.item__map_btn}
              type="button"
              onClick={() => setIsOpenMap(!isOpenMap)}
            >
              {isOpenMap ? (
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
          <div>
            <img
              src={item.mockSportSectionItem.mapSrc}
              alt="map"
              width={400}
              loading="eager"
            />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.item}>
            <img
              src={item.mockSportSectionItem.src}
              alt="logo"
              width={197}
              height={160}
            />
            <div className={styles.item__info}>
              <h3>{item.mockSportSectionItem.title}</h3>
              <p>{item.mockSportSectionItem.category}</p>
              <p>{item.mockSportSectionItem.address}</p>
              <button
                className={styles.item__btn}
                type="button"
                onClick={() => setIsOpenPhone(!isOpenPhone)}
              >
                {isOpenPhone ? (
                  `${item.mockSportSectionItem.telephone}`
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
              onClick={() => setIsOpenMap(!isOpenMap)}
            >
              {isOpenMap ? (
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
            <p>{item.mockSportSectionItem.sale}</p>
            <p>{item.mockSportSectionItem.free}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default SportSectionsItem;
