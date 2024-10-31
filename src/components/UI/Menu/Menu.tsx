import { MenuProps } from '@/Types/types';
import styles from './Menu.module.scss';
// import { sports } from '@/mocks';
import { useAppSelector } from '@/hooks/redux';
// import { selectSport } from '@/store/sportSlice';
// import {handleKeyDown} from '@/utils/keyPress';
// import { useRef, useState } from 'react';

const Menu: React.FC<MenuProps> = ({ onHover, onClick, selectedItems = [], disabled }) => {
  // // const { isAllParentSportsSelected } = useAppSelector(state => state.sports);
   const sportTypes = useAppSelector((state) => state.search.sportTypes);  
  // const handleClick = (item: string) => {
  //   if (!disabled && (!sports[item] || sports[item].length === 0)) {
  //     onClick(item);
  //   }
  // };

  console.log(sportTypes);
  // console.log(items)
  const handleClick = (itemId: number) => {
    if (!disabled) {
      const item = sportTypes.find((type: { id: number; }) => type.id === itemId);
      if (item && item.sports.length === 0) {
        onClick(itemId);
      }
    }
  };
  

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>, item: string) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     e.preventDefault(); // Предотвращаем стандартное поведение для пробела
  //     handleClick(item);
  //   }
  // };


  const areAllSubSportsSelected = (itemId: number) => {
    const item = sportTypes.find((type: { id: number; }) => type.id === itemId);
    if (item && item.sports.length > 0) {
      return item.sports.every((subSport: { id: number; }) => selectedItems.includes(subSport.id));
    }
    return false;
  };

  return (
    <ul className={`${styles.menu} ${disabled ? styles.disabled : ''}`}>
      {sportTypes.map((itemId) => (
       
          <li
            // key={itemId}
            key={itemId.id}
            onMouseEnter={() => onHover(itemId)}
            onClick={() => handleClick(itemId)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(itemId);
              }
            }}
            className={`
              ${styles.menu__item} 
              ${(selectedItems.includes(itemId.id) && (!itemId || itemId.sports.length === 0)) || 
                (itemId && itemId.sports.length > 0 && areAllSubSportsSelected(itemId)) ? 
                styles.selected : ''} 
              ${disabled ? styles.disabled : ''}
            `}
            // className={
            //   styles.menu__item
            
            // }
          >
            <div className={styles.itemContent}>
              {itemId && itemId.sports.length > 0 && (
                <span className={styles.menu__item__arrow}>&lt; </span>
              )} 
              <span className={styles.itemText}>{itemId?.name}</span>
            </div>
          </li>
        
      ))}
    </ul>
  );
  };
  
  export default Menu;