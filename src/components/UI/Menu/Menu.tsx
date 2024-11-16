import { MenuProps } from '@/Types/types'
import styles from './Menu.module.scss'
import { useAppSelector } from '@/hooks/redux'
// import { selectSport } from '@/store/sportSlice';
// import {handleKeyDown} from '@/utils/keyPress';
// import { useRef, useState } from 'react';

const Menu: React.FC<MenuProps> = ({
  onHover,
  onClick,
  selectedItems = [],
  disabled,
}) => {
  const { hoveredSport } = useAppSelector((state) => state.sports)
  const sportTypes = useAppSelector((state) => state.search.sportTypes)

  console.log(sportTypes)
  // console.log(items)
  const handleClick = (itemId: number) => {
    if (!disabled) {
      const item = sportTypes.find((type: { id: number }) => type.id === itemId)
      if (item && item.sports.length === 0) {
        // @ts-ignore
        onClick(itemId)
      }
    }
  }

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>, item: string) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     e.preventDefault(); // Предотвращаем стандартное поведение для пробела
  //     handleClick(item);
  //   }
  // };

  const areAllSubSportsSelected = (itemId: number) => {
    const item = sportTypes.find((type: { id: number }) => type.id === itemId)
    if (item && item.sports.length > 0) {
      return item.sports.every((subSport: { id: number }) =>
        // @ts-ignore
        selectedItems.includes(subSport.id),
      )
    }
    return false
  }

  return (
    <ul className={`${styles.menu} ${disabled ? styles.disabled : ''}`}>
      {
        // @ts-ignore
        sportTypes.map((itemId) => (
          <li
            // key={itemId}
            key={itemId.id}
            // @ts-ignore
            onMouseEnter={() => onHover(itemId)}
            onClick={() => handleClick(itemId)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(itemId)
              }
            }}
            className={`
              ${styles.menu__item} 
              ${
                (selectedItems.includes(itemId.id) &&
                  (!itemId || itemId.sports.length === 0)) ||
                (itemId &&
                  itemId.sports.length > 0 &&
                  areAllSubSportsSelected(itemId))
                  ? styles.selected
                  : ''
              } 
              ${disabled ? styles.disabled : ''}
              ${hoveredSport?.id === itemId.id ? styles.hovered : ''}
            `}
          >
            <div className={styles.itemContent}>
              {itemId && itemId.sports.length > 0 && (
                <span className={styles.menu__item__arrow}>&lt; </span>
              )}
              <span className={styles.itemText}>{itemId?.name}</span>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default Menu
