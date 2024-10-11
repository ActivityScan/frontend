import { SubMenuProps } from '@/Types/types';
import React, { useEffect, useState } from 'react';
import styles from './Menu.module.scss';
import DropdownButton from '../Buttons/DropdownButton/DropDownButton';
import { getAllForm } from '@/utils/getAllForm';

const SubMenu: React.FC<SubMenuProps> = ({ items, onClick, selectedItems = [], parentSport, onSelectAll, disabled }) => {
  const [allSelected, setAllSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setAllSelected(items.every(item => selectedItems.includes(item)));
  }, [items, selectedItems]);

  const handleSelectAll = () => {
    if (allSelected) {
      // Если все уже выбраны, снимаем выбор со всех
      items.forEach(item => onClick(item));
    } else {
      // Иначе выбираем все
      onSelectAll(parentSport, items);
    }
    setAllSelected(!allSelected);
  };

  const getButtonText = () => {
    if (allSelected) {
      return isHovered ? "Отменить" : `Выбраны ${getAllForm(parentSport).toLowerCase()} ${parentSport.toLowerCase()}`;
    } else {
      return `${getAllForm(parentSport)} ${parentSport.toLowerCase()}`;
    }
  };

  return (
    <ul className={`${styles.submenu} ${disabled ? styles.disabled : ''}`}>
        <DropdownButton 
        onClick={handleSelectAll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {getButtonText()}
      </DropdownButton>
      {items.map((item) => (
        <li
          key={item}
          onClick={() => onClick(item)}
          className={`${styles.menu__subitem} ${selectedItems.includes(item) ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
        >
           <input 
            className={styles.checkbox}
            type="checkbox" 
            checked={selectedItems.includes(item)}
            onChange={() => {}} // Для предотвращения предупреждения React о неконтролируемом компоненте
            onClick={(e) => e.stopPropagation()} // Предотвращаем двойной клик
          />
          {item}
          
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;