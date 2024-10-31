// src/components/SportSelector.tsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  removeSports,
  selectAllSports,
  selectSport,
  setHoveredSport,
  setSuggestions,
  toggleAllSports,
  toggleSetSportSelector,
} from "@/store/sportSlice";
import styles from "./SportDropdown.module.scss";

import { InputFieldProps } from "@/Types/types";
import DropdownButton from "../UI/Buttons/DropdownButton/DropDownButton";
import Menu from "../UI/Menu/Menu";
import SubMenu from "../UI/Menu/Submenu";
import getDisplayText, {
  extractCategoryName,
} from "@/utils/getInputTextDisplay";
import InputSports from "../UI/Input/InputSports";
import { getAllForm } from "@/utils/getAllForm";

const SportSelector: React.FC<InputFieldProps> = ({
  name,
  control,
  rules,
  ...props
}) => {
  const isOpen = useAppSelector((state) => state.sports.isOpen);
  const selectorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const subdropdownRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null); // Ссылка на контейнер ввода
  const dispatch = useAppDispatch();
  const { selectedSports, allSportsSelected, hoveredSport } = useAppSelector(
    (state) => state.sports
  );

  const [hoveredSportOnInput, setHoveredSportOnInput] = useState<string | null>(
    null
  );
  const sports = useAppSelector((state) => state.search.sportTypes);

  console.log(sports);
  // const displaySportSelectorText =
  //   selectedSports.length === 0 ? "Вид спорта" : selectedSports.join(", "); //перенос выбранных видов спорта в первый инпут
  const handleOnSportTextClick = (text: string) => {
    console.log(text);
    // Обработка клика на категорию.например, "Все водные виды спорта"
    if (text.startsWith("Выбран")) {
      const categoryName = extractCategoryName(text);
      console.log(categoryName);
      handleCategoryClick(categoryName);
    } else if (text.startsWith("Все виды спорт")) {
      // Обработка клика на все виды спорта
      dispatch(selectSport('Все виды спорта'));
    } else {
      // Обработка клика на отдельный вид спорта
      dispatch(selectSport(text));
    }
    setHoveredSportOnInput(null);
  };
  const getCategoryName = () => {
    const category = sports.find((category) =>
      category.sports.every((sport) => selectedSports.includes(sport.name))
    );
    // return category ? `Все ${category.name} виды спорта` : selectedSports.join(", ");
    return category
      ? ` ${getAllForm(
          category.name.toLowerCase()
        )} ${category.name.toLowerCase()} `
      : selectedSports;
  };

  const displaySportSelectorText =
    selectedSports.length === 0 ? "Вид спорта" : getCategoryName();
  const handleSportHover = (sport: string) => {
    // setHoveredSport(sport);
    // console.log(sport.name);
    dispatch(setHoveredSport(sport));
  };

  const handleSportClick = (sport: string | { name: string }) => {
    dispatch(selectSport(sport));
  };

  const handleCategoryClick = (categoryName: string) => {
    // Найти все виды спорта в выбранной категории
    const category = sports.find((cat) => cat.name === categoryName);
    if (category) {
      const sportNames = category.sports.map((sport) => sport.name);
      // Удалить все виды спорта этой категории из стора
      dispatch(removeSports(sportNames));
    }
  };

  const handleSelectAllSports = () => {
    dispatch(toggleAllSports());
  };

  const getDisplayTextWithHover = () => {
    const displayText = getDisplayText(selectedSports, sports); // Генерируем строку для отображения с помощью функции getDisplayText

    return displayText.map((text: string, index: number) => (
      <div
        key={index}
        className={`${hoveredSportOnInput === text ? styles.hovered : ""} ${
          styles.sportItem
        }`}
        onMouseEnter={() => setHoveredSportOnInput(text)}
        onMouseLeave={() => setHoveredSportOnInput(null)}
        onClick={() => handleOnSportTextClick(text)}
        // onClick={() => dispatch(selectSport(displayText))} // Обрабатываем клик для строки отображения
      >
        {text}
      </div>
    ));
  };

  useLayoutEffect(() => {
    if (
      isOpen &&
      inputContainerRef.current &&
      dropdownRef.current &&
      subdropdownRef.current
    ) {
      const inputContainerRect =
        inputContainerRef.current.getBoundingClientRect();
      dropdownRef.current.style.top = `${
        inputContainerRect.height * 1.24 + 47
      }px`; // Position dropdown below inputContainer
      subdropdownRef.current.style.top = `${
        inputContainerRect.height * 1.24 + 47
      }px`;
    }
  }, [isOpen, selectedSports.length]);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleSetSportSelector({ isOpen: false }));
        dispatch(setSuggestions([]));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  // console.log(allSportsSelected);
  console.log(selectedSports);
  // const handleSelectAll = (parentSport: string) => {
  //   const sportsToAdd = sports[parentSport] || [];
  //   dispatch(selectAllSports({ parentSport, sports: sportsToAdd }));
  // };

  const handleSelectAll = (
    hoveredSport,
    sportsToAdd: Array<{ id: string; name: string }>
  ) => {
    const selectedSportNames = sportsToAdd.map((sport) => sport.name);
    // dispatch(selectAllSports({ parentSport: parentSport.name?, sports: selectedSportNames }));
    if (hoveredSport?.name) {
      // Если имя родительского спорта существует, отправляем его и список выбранных видов спорта
      dispatch(
        selectAllSports({
          parentSport: hoveredSport.name,
          sports: selectedSportNames,
        })
      );
    } else {
      // Если имени нет, отправляем только родительский спорт без имени
      dispatch(
        selectAllSports({
          parentSport: hoveredSport,
          sports: selectedSportNames,
        })
      );
    }
  };

  // const handleCloseSelectSports = () => {
  //   dispatch(toggleSetSportSelector({ isOpen: false }));
  // };

  return (
    <div className={styles.container} ref={selectorRef}>
    
     
     {/* {location.pathname === "/searchresults" && isOpen && (
        <div className={styles.overlay} />
      )} */}
      
      <div
        className={isOpen ? styles.sportSelectorActive : styles.sportSelector}
      >
        {/* <div> */}
        <label
          htmlFor="sport-input"
          onClick={() => dispatch(toggleSetSportSelector({ isOpen: !isOpen }))}
        >
          {displaySportSelectorText}
        </label>

        {isOpen && (
          <div className={styles.inputContainer} ref={inputContainerRef}>
            <InputSports
              // onClick={toggleDropdown}
              id="sport-input"
              type="text"
              placeholder="Начните вводить"
              // readOnly
              className={styles.sportSelector__input}
              // onClick={() => setIsOpen(!isOpen)}
              control={control}
              name={name}
              // value={
              //   allSportsSelected
              //     ? "Все виды спорта"
              //     // : displaySportSelectorText
              //     : getDisplayText(selectedSports,sports)
              // }
              value={
                selectedSports.length === 0
                  ? "Вид спорта"
                  : getDisplayText(selectedSports, sports).join(", ")
              }
              children={getDisplayTextWithHover()}
              // field={field}
              // value={allSportsSelected ? 'Все виды спорта' : selectedSports.join(', ')}
              // onRemove={handleRemoveSport}// Отображаем выбранные виды спорта
              // onSearch={handleSearch}
              // suggestions={suggestions}
              // onSuggestionSelect={handleSportClick}
            />
          </div>
        )}

        {isOpen && (
          // <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
          <div
            ref={dropdownRef} // Добавляем ссылку на дропдаун
            className={`${styles.dropdown} ${isOpen ? styles.open : ""} ${
              allSportsSelected ? styles.disabled : ""
            }`}
          >
            <div className={styles.dropdown__menu}>
              <DropdownButton onClick={handleSelectAllSports}>
                {" "}
                {allSportsSelected ? "Отменить выбор" : "Выбрать все"}
              </DropdownButton>
              <Menu
                // items={Object.keys(sports)}
                onHover={handleSportHover}
                onClick={handleSportClick}
                selectedItems={selectedSports}
                disabled={allSportsSelected}
              />
            </div>
          </div>
        )}
        {/* </div> */}
        {hoveredSport &&
          hoveredSport.sports &&
          hoveredSport.sports.length > 0 &&
          isOpen && (
            <SubMenu
              ref={subdropdownRef}
              parentSport={hoveredSport}
              items={hoveredSport.sports.map((subSport) => ({
                id: subSport.id,
                name: subSport.name,
              }))}
              // items={sports[hoveredSport]}
              // onClick={handleSubSportClick}
              onClick={handleSportClick}
              selectedItems={selectedSports}
              onSelectAll={handleSelectAll}
              disabled={allSportsSelected}
              // onSelectAll={() => {}}
            />
          )}
      </div>
    </div>
  );
};

export default SportSelector;
