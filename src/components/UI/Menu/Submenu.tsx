import { SubMenuProps } from '@/Types/types'
import { forwardRef, useEffect, useState } from 'react'
import styles from './Menu.module.scss'
import DropdownButton from '../Buttons/DropdownButton/DropDownButton'
import { getAllForm } from '@/utils/getAllForm'
import { useAppDispatch } from '@/hooks/redux'
import { selectSport } from '@/store/sportSlice'

const SubMenu = forwardRef<HTMLUListElement, SubMenuProps>(
  (
    { items, onClick, selectedItems = [], parentSport, onSelectAll, disabled },
    ref,
  ) => {
    const [allSelected, setAllSelected] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
      setAllSelected(
        parentSport
          ? parentSport.sports.every((sport) =>
              // @ts-ignore
              selectedItems.includes(sport.name),
            )
          : false,
      )
    }, [items, parentSport, selectedItems])

    const handleSelectAll = () => {
      if (allSelected) {
        items.forEach((item) => onClick(item.name))
      } else {
        onSelectAll(parentSport.name, items)
      }
      setAllSelected(!allSelected)
    }

    // console.log(parentSport.name)
    const getButtonText = () => {
      if (allSelected) {
        return isHovered
          ? 'Отменить'
          : `${getAllForm(parentSport.name.toLowerCase())} ${parentSport.name.toLowerCase()}`
      } else {
        return `${parentSport?.name}`
      }
    }

    const handleSportClick = (sport: string) => {
      dispatch(selectSport(sport))
    }

    return (
      <ul
        ref={ref}
        className={`${styles.submenu} ${disabled ? styles.disabled : ''}`}
      >
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
              onClick={
                () => handleSportClick(item.name)
                //  onClick(item)
              }
              className={`${styles.menu__subitem} ${selectedItems.includes(item) ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
            >
              <input
                className={styles.checkbox}
                type="checkbox"
                // @ts-ignore
                checked={selectedItems.includes(item.name)}
                onChange={() => {}} // Для предотвращения предупреждения React о неконтролируемом компоненте
                onClick={(e) => e.stopPropagation()} // Предотвращаем двойной клик
              />
              {item?.name}
            </li>
          )
        })}
      </ul>
    )
  },
)

export default SubMenu
