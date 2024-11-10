// WorkModeSelector.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@/store/searchSlice";
import { RootState } from "@/store";
import { workModes2 } from "@/mocks";
import { InputFieldProps, OptionType, SearchState } from "@/Types/types";
import Select, { MultiValue, ActionMeta, StylesConfig } from "react-select";
import styles from "./WorkModeSelector.module.scss";
// import _colors from "@/styles/_colors.module.scss";

const WorkModeSelector: React.FC<InputFieldProps> = ({
  name,
  control,
  rules,
  children,
  ...props
}) => {
  const dispatch = useDispatch();
  const { modeWork, weekdayTimes } = useSelector(
    (state: RootState) => state.search
  );
  const [options, setOptions] = useState(workModes2);
  //  export type OptionType = { value: SearchState['mode']; label: string };

  const handleModesChange = (
    newValue: readonly SearchState["modeWork"][],
    actionMeta: ActionMeta<OptionType>
  ) => {
    const values = newValue.map((option) => option.value);
    console.log(values);

    const isAnyTimeSelected = values.includes("any");
    const isAllDayWeekdaysSelected = values.includes("all");

    const updatedOptions = workModes2.map((group) => {
      if (group.options) {
        return {
          ...group,
          options: group.options.map((option) => ({
            ...option,
            isDisabled:
              (isAnyTimeSelected && option.value !== "any") || // Блокируем остальные опции, если выбрано "Любое время"
              (isAllDayWeekdaysSelected &&
                ["6-11", "11-16", "16-23"].includes(option.value)), // Блокируем временные интервалы, если выбрано "Весь день"
          })),
        };
      } else {
        return {
          ...group,
          isDisabled: isAnyTimeSelected && group.value !== "any", // Делаем остальные одиночные опции недоступными, если выбрано "Любое время"
        };
      }
    });

    setOptions(updatedOptions);
    dispatch(setMode(values));
  };

  console.log(modeWork, weekdayTimes);

  const selectedModes = options.flatMap((group) => {
    if (group.options) {
      // Если у группы есть вложенные опции, фильтруем их
      return group.options.filter((option) => modeWork.includes(option.value));
    } else {
      // Если это одиночная опция, проверяем её значение
      return modeWork.includes(group.value) ? [group] : [];
    }
  });

  const customStyles: StylesConfig = {
    groupHeading: (provided) => ({
      ...provided,
      fontSize: "1em",
      color: "var(--dark-blue)",
    }),
    container: (provided, state) => ({
      ...provided,
      width: "100%",
      // margin: '0 auto', // Центрирование контейнера на странице
      backgroundColor: state.isFocused ? "#fcfaf9" : "#fcfaf9",
      border: state.isFocused ? "2px solid #adcde5" : "2px solid #ff9900",
      borderRadius: "4px",
      boxSizing: "border-box",
      height: "64px",
      padding: "0px",
      textAlign: "center",
      alignContent: "space-around",
      caretColor: "transparent",
      maxHeight: "64px",

      //  border: state.isSelected ? 'none' : 'none', // Линия разделения между индикаторами и полем ввода
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "inherit",
      cursor: "pointer",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0px", // Внутренний отступ
      width: "0px",
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
      widht: "10px",
      padding: "0px",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "0px",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "${white}" : "transparent",
      border: "none",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      outline: "none",
      padding: "inherit",
      whiteSpace: "nowrap",
      overflow: "inherit",
      textOverflow: "ellipsis",
      height: "inherit",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "24px", // Изменение размера шрифта
      color: "#041129",
      paddingLeft: "10px",
      fontFamily: "Wix Madefor Display",
      marginBottom: "4px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f0f0f0",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected
        ? "green"
        : state.isFocused
        ? "#e0e0e0"
        : "white",
      // cursor: state.isDisabled ? 'not-allowed' : 'pointer', // Блокировка курсора для отключенных опций
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "green",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "${white}",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#666666",
      background: "transparent",
      border: "1px solid grey",
      fontSize: "16px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "red",
      ":hover": {
        backgroundColor: "grey",
        color: "white",
      },
    }),
  };

  return (
    <>
      <Select<OptionType, true>
        value={selectedModes}
        // value={options.flatMap((group) =>
        //   group.options ? group.options.filter((option) => modeWork.includes(option.value)) : []
        // )}
        onChange={handleModesChange}
        options={options}
        styles={customStyles}
        placeholder="Выберите режимы работы"
        isMulti
        className={styles.select}
        {...props}
      />

      {children}
    </>
  );
};

export default WorkModeSelector;
