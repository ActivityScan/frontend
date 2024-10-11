// WorkModeSelector.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '@/store/searchSlice';
import { RootState } from '@/store';
import { workModes2 } from '@/mocks';
import { InputFieldProps, OptionType, SearchState } from '@/Types/types';
import Select, { MultiValue, ActionMeta, StylesConfig } from 'react-select';
import _colors from '@/styles/_colors.module.scss';

const WorkModeSelector: React.FC<InputFieldProps> = ({ name,control, rules, children,...props 
}) => {
  const dispatch = useDispatch();
  const { modeWork, weekdayTimes } = useSelector((state: RootState) => state.search);
  const [options, setOptions] = useState(workModes2);
//  export type OptionType = { value: SearchState['mode']; label: string };

  const handleModesChange = (
    newValue: readonly SearchState['modeWork'][],
    actionMeta: ActionMeta<OptionType>
  ) => {
    const values = newValue.map((option) => option.value);
    console.log(values);
   
    const isAnyTimeSelected = values.includes('any');
    const isAllDayWeekdaysSelected = values.includes('all');

    const updatedOptions = workModes2.map((group) => {
      if (group.options) {
        return {
          ...group,
          options: group.options.map((option) => ({
            ...option,
            isDisabled: 
            (isAnyTimeSelected && option.value !== 'any') || // Блокируем остальные опции, если выбрано "Любое время"
            (isAllDayWeekdaysSelected && ['6-11', '11-16', '16-23'].includes(option.value)), // Блокируем временные интервалы, если выбрано "Весь день"
          })),
        };
      } else {
        return {
          ...group,
          isDisabled:
           isAnyTimeSelected && group.value !== 'any', // Делаем остальные одиночные опции недоступными, если выбрано "Любое время"
        };
      }
    });

    setOptions(updatedOptions);
    dispatch(setMode(values));
    
  }
  
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
      fontSize: '1em',
      color: 'grey',
    }),
    container: (provided, state) => ({
      ...provided,
      width: '100%',  // Настройка ширины самого контейнера селекта
      // margin: '0 auto', // Центрирование контейнера на странице
      backgroundColor: state.isFocused ? '#FDDF9D' : 'transparent',
      height: '100%',
      padding: '0px',
      textAlign: 'start',
      alignContent: 'space-around',
      //  border: state.isSelected ? 'none' : 'none', // Линия разделения между индикаторами и полем ввода
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: 'inherit',
      // padding: '2px 8px', // Отступы внутри контейнера значений
      // display: 'flex', // Дисплей для выравнивания значений
      // alignItems: 'center',
      // flexWrap: 'wrap', // Чтобы значения переносились на следующую строку, если не помещаются
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      // backgroundColor: '#f0f0f0', // Задний фон контейнера индикаторов
       padding: '0px', // Внутренний отступ
      // borderRadius: '0 8px 8px 0', // Скругленные углы, чтобы совпадать с основным контейнером
      // borderLeft: '1px solid #ccc', // Линия разделения между индикаторами и полем ввода
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      widht: '10px',
      // color: 'blue', // Цвет стрелки открытия меню
      // '&:hover': {
      //   color: 'darkblue', // Цвет стрелки при наведении
      // },
      padding: '0px',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: '0px',
      // backgroundColor: 'transparent',
      // '&:hover': {
      //   color: 'grey', // Цвет стрелки при наведении
      // },
    }),
    control: (provided, state) => ({
      ...provided,
      // padding: '5px',
      // borderRadius: '10px',
      backgroundColor: state.isFocused ? '${orange-pastel}' : 'transparent',
      // borderColor: state.isFocused ? 'green' : 'gray',
      border: 'none',
      boxShadow: state.isFocused ? 'none' : provided.boxShadow, 
      outline: 'none',
      padding: 'inherit',
      whiteSpace: 'nowrap',
      overflow: 'inherit',
      textOverflow: 'ellipsis',
      height: 'inherit',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '1.2em', // Изменение размера шрифта
      // fontWeight: 'bold', // Жирный шрифт
      // color: '#888', // Цвет текста
      // fontStyle: 'italic', // Курсив
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
     
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '10px',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'green' : state.isFocused ? '#e0e0e0' : 'white',
      // cursor: state.isDisabled ? 'not-allowed' : 'pointer', // Блокировка курсора для отключенных опций
    
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'green',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '${orange-pastel}',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#666666',
      background: 'transparent',
      border: '1px solid grey',
      fontSize: '16px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'red',
      ':hover': {
        backgroundColor: 'grey',
        color: 'white',
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
        {...props}
        
        />
    
      {children}
    </>
  );
};

export default WorkModeSelector;