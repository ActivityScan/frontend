// src/components/SportSelector.tsx
import React, { useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  removeSport,
  selectAllSports,
  selectSport,
  setHoveredSport,
  setSuggestions,
  toggleAllSports,
} from "@/store/sportSlice";
import styles from "./SportDropdown.module.scss";
// import { Sports } from '../../Types/types';
import { sports } from "@/mocks";
// import styles from "../UI/Input/Input.module.scss";
// import InputBar from "../UI/Input/InputBar";
// import InputItem from "../UI/Input/Input";
// import { Control } from "ol/control";
import { InputFieldProps } from "@/Types/types";
import DropdownButton from "../UI/Buttons/DropdownButton/DropDownButton";
import Menu from "../UI/Menu/Menu";
import SubMenu from "../UI/Menu/Submenu";
import getDisplayText from "@/utils/getInputTextDisplay";
import InputSports from "../UI/Input/InputSports";

const SportSelector: React.FC<InputFieldProps> = ({
  name,
  control,
  rules,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { selectedSports, allSportsSelected, hoveredSport, suggestions } =
    useAppSelector((state) => state.sports);
  // const selectedSport = useAppSelector((state) => state.sport.selectedSport);
  // const selectedSubSport = useAppSelector((state) => state.sport.selectedSubSport);
  const [hoveredSportOnInput, setHoveredSportOnInput] = useState<string | null>(
    null
  );

  const allSportsList = Object.keys(sports).concat(
    Object.values(sports).flat()
  );
  const displaySportSelectorText =
    selectedSports.length === 0 ? "Вид спорта" : selectedSports.join(", "); //перенос выбранных видов спорта в первый инпут
  const handleSportHover = (sport: string) => {
    // setHoveredSport(sport);
    dispatch(setHoveredSport(sport));
  };

  const handleSportClick = (sport: string) => {
    console.log(sport);
    dispatch(selectSport(sport));
  };

  const handleSelectAllSports = () => {
    dispatch(toggleAllSports());
  };

  // const handleSearch = (query: string) => {
  //   const filteredSuggestions = allSportsList.filter((sport) =>
  //     sport.toLowerCase().includes(query.toLowerCase())
  //   );
  //   dispatch(setSuggestions(filteredSuggestions));
  //   return filteredSuggestions;
  // };

  // const handleRemoveSport = (sport: string) => {
  //   dispatch(removeSport(sport));
  // };
  // // console.log(hoveredSportOnInput);

  const getDisplayTextWithHover = () => {
    return selectedSports.map((sport: string, index: number) => (
      <div
        key={index}
        className={`${hoveredSportOnInput === sport ? styles.hovered : ""} ${
          styles.sportItem
        }`}
        onMouseEnter={() => setHoveredSportOnInput(sport)}
        onMouseLeave={() => setHoveredSportOnInput(null)}
        onClick={() => handleSportClick(sport)}
      >
        {sport}
        {/* {index < selectedSports.length - 1 ? ', ' : ''} */}
      </div>
    ));
  };

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
  const handleSelectAll = (parentSport: string) => {
    const sportsToAdd = sports[parentSport] || [];
    dispatch(selectAllSports({ parentSport, sports: sportsToAdd }));
  };

  return (
    <div className={styles.container} ref={selectorRef}>
      <div
        className={isOpen ? styles.sportSelectorActive : styles.sportSelector}
      >
        {/* <div> */}
        <label htmlFor="sport-input" onClick={() => setIsOpen(!isOpen)}>
          {displaySportSelectorText}
        </label>

        {isOpen && (
          <div className={styles.inputContainer}>
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
              value={
                allSportsSelected
                  ? "Все виды спорта"
                  : getDisplayText(selectedSports)
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
                items={Object.keys(sports)}
                onHover={handleSportHover}
                onClick={handleSportClick}
                selectedItems={selectedSports}
                disabled={allSportsSelected}
              />
            </div>
          </div>
        )}
        {/* </div> */}
        {hoveredSport && sports[hoveredSport].length > 0 && isOpen && (
          <SubMenu
            parentSport={hoveredSport}
            items={sports[hoveredSport]}
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
