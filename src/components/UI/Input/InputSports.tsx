// import { useState } from "react";
import type { Input } from "../../../Types/types";
import { useController, Control, RegisterOptions } from 'react-hook-form';
// import List from "../List/List";

import styles from "./Input.module.scss";
import { InputFieldProps } from "../../../Types/types";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector} from "@/hooks/redux";
import { selectSport } from "@/store/sportSlice";

const InputSports: React.FC<InputFieldProps>=({
//   title,
//   type,
//   className,  
//   placeholder,
//   searchValue,
//   onChangeSearchInput,
//   setSearchValue,
 name,control, rules, children, useWatch,...props 
}) => {
    // const { field, fieldState } = useController({
    //     name,
    //     control,
    //     rules,
    // });
    const [hoveredSportOnInput, setHoveredSportOnInput] = useState<string | null>(null);
    // const editableDivRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { selectedSports } = useAppSelector(state => state.sports);
  // Обновление содержимого при изменении детей
  

  const handleMouseEnter = (sport: string) => {
  
    setHoveredSportOnInput(sport)
    // Логика для зачеркивания при наведении
  };

  const handleMouseLeave = () => {
    setHoveredSportOnInput(null)
  
    // Логика для отмены зачеркивания
  };

  const handleClick = (sport: string) => {
    // const currentValue = field.value ? field.value.split(', ').filter(Boolean) : [];; // Преобразуем строку в массив
    // console.log(currentValue)
    // // Если спорт уже выбран, удаляем его
    // if (currentValue.includes(sport)) {
    //   const updatedSports = currentValue.filter((s: string) => s !== sport); // Удаляем спорт
    //   field.onChange(updatedSports.join(', ')); // Обновляем value как строку
    // } else {
    //   // Если спорт не выбран, добавляем его
    //   const updatedSports = [...currentValue, sport]; 
    //   // Добавляем новый спорт
    //   field.onChange(updatedSports.join(', '));
    //   console.log(updatedSports) // Обновляем value как строку
    // }
    
    dispatch(selectSport(sport)); // Обновляем Redux состояние
    console.log(selectedSports)
  };

  // const renderChildrenAsHTML = (children: React.ReactNode): Node => {
  //   const fragment = document.createDocumentFragment();
    
  //   React.Children.forEach(children, (child) => {
  //     const span = document.createElement('span');
  //     span.textContent = typeof child === 'string' ? child : '';
  //     span.className = styles.sportItem; // Класс для стилизации
  //     span.onmouseover = () => {
  //       span.classList.add(styles.hovered); // Добавляем класс для зачеркивания
  //     };
  //     span.onmouseout = () => {
  //       span.classList.remove(styles.hovered); // Убираем класс при уходе мыши
  //     };
  //     span.onclick = () => {
  //       // Удаляем вид спорта по клику
  //       field.onChange(field.value.split(', ').filter(s => s !== span.textContent).join(', '));
  //     };
  //     fragment.appendChild(span);
  //     fragment.appendChild(document.createTextNode(', ')); // Запятая между элементами
  //   });

  //   return fragment;
  // };
  // const renderChildrenWithHandlers = (children: ReactNode) => {
  //   return React.Children.map(children, (child) => {
      
  //     // if (React.isValidElement(child)) {
  //     //   const sport = child.props.children; // Предполагаем, что текст спорта передается в children
  //     //   console.log(sport);
  //     //   return React.cloneElement(child as React.ReactElement<any>, {
  //     //   });
      
  //     // }
  //     return child;
  //   });
  // };

  // console.log('Children in InputSports: ', children);

return (
    <>
      {/* <div  
        // ref={editableDivRef}
        // className={styles.input}
        // suppressContentEditableWarning
        // // contentEditable // Делаем div редактируемым
        // // onInput={handleInput} // Обрабатываем изменения
        // {...props}
        // onInput={() => field.onChange(editableDivRef.current?.textContent)}
      /> */}
          {/* {children} */}
        {/* {renderChildrenWithHandlers(children)} */}
     <div className = {styles.sportItem__child}> 
        {children ? children : "No children found"} {/* Показываем сообщение если детей нет */}
      </div>
      {/* {fieldState.error && <div className={styles.inputError}>{fieldState.error.message}</div>} */}
    </>
  );
};

export default InputSports;