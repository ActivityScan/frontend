import { MenuProps } from '@/Types/types';
import styles from './Menu.module.scss';
import { sports } from '@/mocks';
// import {handleKeyDown} from '@/utils/keyPress';
// import { useRef, useState } from 'react';

const Menu: React.FC<MenuProps> = ({ items, onHover, onClick, selectedItems = [], disabled }) => {
  // const { isAllParentSportsSelected } = useAppSelector(state => state.sports);
  const handleClick = (item: string) => {
    if (!disabled && (!sports[item] || sports[item].length === 0)) {
      onClick(item);
    }
  };
  //  console.log(isAllParentSportsSelected)

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>, item: string) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     e.preventDefault(); // Предотвращаем стандартное поведение для пробела
  //     handleClick(item);
  //   }
  // };

  //проверка что все подвиды спорта в нправлении выбраны 
  const areAllSubSportsSelected = (item: string) => {
    if (sports[item] && sports[item].length > 0) {
      return sports[item].every(subSport => selectedItems.includes(subSport));
    }
    return false;
  };

    return (
      <ul className={`${styles.menu} ${disabled ? styles.disabled : ''}`}>
        {items.map((item) => (
          <li
            key={item}
            onMouseEnter={() => onHover(item)}
            onClick={() => handleClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(item);
              }
            }}
            // onKeyDown={(e) => handleKeyDown(e, item)}
            // className={`${styles.menu__item} ${selectedItems.includes(item) ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
            className={`
              ${styles.menu__item} 
              ${(selectedItems.includes(item) && (!sports[item] || sports[item].length === 0)) || 
                (sports[item] && sports[item].length > 0 && areAllSubSportsSelected(item)) ? 
                styles.selected : ''} 
              ${disabled ? styles.disabled : ''}
            `}
          >
            <div className={styles.itemContent}>
              { (sports[item] && sports[item].length > 0) && (
                <span className={styles.menu__item__arrow}>&lt; </span>
              )} 
              <span className={styles.itemText}>{item}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Menu;