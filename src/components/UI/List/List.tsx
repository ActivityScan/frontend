import styles from "./List.module.scss";
import type { List } from "../../../Types/types";
import { CATEGORY_SPORTS } from "../../../mocks";
import { useState } from "react";

const List = ({ searchValue }: { searchValue: string }) => {
  // console.log(searchValue);
  const [showList, setShowList] = useState<Record<string, boolean>>({});

  const handleMoreItems = (item: { id: string }) => {
    setShowList((prevShowList) => ({
      ...prevShowList,
      [item.id]: !prevShowList[item.id],
    }));
  };

  const handleTargetItem = (item: { subtitle: string }) => {
    console.log(item?.subtitle);
  };

  const renderItems = () => {
    const filteredItems = CATEGORY_SPORTS.filter((item) =>
      // item.list?.map((sport) => {
      //   sport.subtitle.toLowerCase().includes(searchValue.toLowerCase());
      // }) ||
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <ul className={styles.list}>
        {filteredItems.map((item) => (
          <li className={styles.list__item} key={item.id}>
            {item.title}
            {item.list && (
              <button
                className={styles.list__btn}
                type="button"
                onClick={() => handleMoreItems(item)}
              >
                {showList[item.id] ? "<" : ">"}
              </button>
            )}
            {showList[item.id] && (
              <ul className={styles.list__sublist}>
                {item.list?.map((item) => (
                  <li
                    className={styles.list__sublist_item}
                    key={item.id}
                    onClick={() => handleTargetItem(item)}
                  >
                    {item.subtitle}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div>{renderItems()}</div>
    </>
  );
};

export default List;
