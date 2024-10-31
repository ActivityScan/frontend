import { SubMenuProps } from '@/Types/types';
import { forwardRef, LegacyRef, useEffect, useState } from 'react';
import styles from './Menu.module.scss';
import DropdownButton from '../Buttons/DropdownButton/DropDownButton';
import { getAllForm } from '@/utils/getAllForm';
import { useAppDispatch } from '@/hooks/redux';
import { selectSport } from '@/store/sportSlice';

const SubMenu = forwardRef<HTMLUListElement, SubMenuProps>(({ 
  items,
  onClick, 
  selectedItems = [], 
  parentSport, 
  onSelectAll, 
  disabled },
   ref) => {
  const [allSelected, setAllSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // const sportTypes = useAppSelector((state) => state.search.sportTypes);  
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const parentSport = sportTypes.find(type => type.id === parentSportId);
    // console.log(parentSport);
    setAllSelected(parentSport ? parentSport.sports.every(sport => selectedItems.includes(sport.name)) : false);
  }, [items, parentSport, selectedItems]);

  const handleSelectAll = () => {
    if (allSelected) {
      items.forEach(item => onClick(item.name));
    } else {
      onSelectAll(parentSport.name, items);
    }
    setAllSelected(!allSelected);
  };


  // console.log(parentSport.name)
  const getButtonText = () => {
    // const parentSport = sportTypes.find(type => type.id === parentSportId);
    // console.log(parentSport);
    if (allSelected) {
      return isHovered ? "Отменить" : `
        
       ${getAllForm(parentSport.name.toLowerCase())} ${parentSport.name.toLowerCase()} `;
    } else {
      return `${parentSport?.name}`;
    }
  };

  // const handleSportClick = (sport) => {
  //   if (sport?.name) {
  //     // Если имя существует, отправляем только имя
  //     dispatch(selectSport(sport.name));
  //   } 
  // };
  const handleSportClick = (sport) => {
    dispatch(selectSport(sport));
  };

  return (

    <ul ref={ref as LegacyRef<HTMLDivElement> | undefined} className={`${styles.submenu} ${disabled ? styles.disabled : ''}`}>
      <DropdownButton 
        onClick={handleSelectAll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {getButtonText()}
      </DropdownButton>
      {items.map((item, index) => {
        // const item = sportTypes.flatMap(type => type.sports).find(sport => sport.id === subItem);
        return (
          <li
            // key={itemId}
            key={`${item}-${index}`}
            onClick={() =>handleSportClick(item.name)
              //  onClick(item)
              }
            className={`${styles.menu__subitem} ${selectedItems.includes(item) ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
          >
            <input 
              className={styles.checkbox}
              type="checkbox" 
              checked={selectedItems.includes(item.name)}
              onChange={() => {}} // Для предотвращения предупреждения React о неконтролируемом компоненте
              onClick={(e) => e.stopPropagation()} // Предотвращаем двойной клик
            />
            {item?.name}
          </li>
        );
      })}
    </ul>
 
  );
});

export default SubMenu;