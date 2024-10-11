import styles from "./Filters.module.scss";
import { useState } from "react";

const Filters = () => {
  const [activeButton, setActiveButton] = useState<string | null>("left");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <section className={styles.container}>
      <div>
        <div>
          <h2>Еще фильтры...</h2>
        </div>
        <section className={styles.content}>
          <div
            className={
              activeButton === "left"
                ? `${styles.content_active}`
                : `${styles.content_inactive}`
            }
            onClick={() => handleButtonClick("left")}
          >
            ...общие
            {activeButton === "left" && (
              <div className={styles.content__left}>
                <div>
                  <p>Цена за занятие, ₽</p>
                  <div>
                    от{" "}
                    <input
                      className={styles.content__left_input}
                      type="number"
                    />{" "}
                    до{" "}
                    <input
                      className={styles.content__left_input}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <p>Категория тренера</p>
                  <div className={styles.content__left_category}>
                    <div className={styles.content__left_category_item}>
                      <input type="checkbox" /> Высшая
                    </div>
                    <div className={styles.content__left_category_item}>
                      <input type="checkbox" /> 1 категория
                    </div>
                    <div className={styles.content__left_category_item}>
                      <input type="checkbox" /> 2 категория
                    </div>
                    <div className={styles.content__left_category_item}>
                      <input type="checkbox" /> Без категории
                    </div>
                  </div>
                </div>
                <div>
                  <p>Членство в федерации</p>
                  <div className={styles.content__left_radio}>
                    <div>
                      <input
                        type="radio"
                        name="radio-left"
                        value={"radio-left-1"}
                      />{" "}
                      Обязательно
                    </div>
                    <data>
                      <input
                        type="radio"
                        name="radio-left"
                        value={"radio-left-2"}
                        defaultChecked
                      />{" "}
                      Не важно
                    </data>
                  </div>
                </div>
                <div className={styles.content__left_services}>
                  <div>
                    <input type="checkbox" /> Наличие парковки
                  </div>
                </div>
                <button className={styles.content__reset_btn} type="submit">
                  Сбросить фильтры
                </button>
                <button className={styles.content__reset_btn} type="submit">
                  Показать результаты
                </button>
              </div>
            )}
          </div>
          <div
            className={
              activeButton === "right"
                ? `${styles.content_active}`
                : `${styles.content_inactive}`
            }
            onClick={() => handleButtonClick("right")}
          >
            ...для плавания
            {activeButton === "right" && (
              <div className={styles.content__right}>
                <div>
                  <p>Длина дорожки, м</p>
                  <div>
                    от{" "}
                    <input
                      className={styles.content__right_input}
                      type="number"
                    />{" "}
                    до{" "}
                    <input
                      className={styles.content__right_input}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <p>Шапочка для плавания</p>
                  <div className={styles.content__right_red_hat}>
                    <div className={styles.content__right_red_hat_item}>
                      <input type="checkbox" /> Обязательна для всех
                    </div>
                    <div className={styles.content__right_red_hat_item}>
                      <input type="checkbox" />
                      <span>Обязательна для длинноволосых</span>
                    </div>
                    <div className={styles.content__right_red_hat_item}>
                      <input type="checkbox" /> Можно без шапочки
                    </div>
                  </div>
                </div>
                <div>
                  <p>Спасатель в бассейне</p>
                  <div className={styles.content__right_radio}>
                    <div>
                      <input
                        type="radio"
                        name="radio-right"
                        value={"radio-right-1"}
                      />{" "}
                      Обязательно
                    </div>
                    <data>
                      <input
                        type="radio"
                        name="radio-right"
                        value={"radio-right-2"}
                        defaultChecked
                      />{" "}
                      Не важно
                    </data>
                  </div>
                </div>
                <div className={styles.content__right_services}>
                  <div>
                    <input type="checkbox" /> Фен в раздевалке
                  </div>
                </div>
                <button className={styles.content__reset_btn} type="submit">
                  Сбросить фильтры
                </button>
                <button className={styles.content__reset_btn} type="submit">
                  Показать результаты
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Filters;
