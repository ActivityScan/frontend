// WorkModeSelector.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setWorkModeOpen } from '@/store/searchSlice'
import { RootState } from '@/store'
import { workModes2 } from '@/mocks'
import { InputFieldProps, OptionType, SearchState } from '@/Types/types'
import Select, { ActionMeta, StylesConfig } from 'react-select'
import styles from './WorkModeSelector.module.scss'
import { useAppSelector } from '@/hooks/redux'
// import _colors from "@/styles/_colors.module.scss";

const WorkModeSelector: React.FC<InputFieldProps> = ({
  // name,
  // control,
  // rules,
  children,
  ...props
}) => {
  const dispatch = useDispatch()
  const { modeWork, weekdayTimes } = useSelector(
    (state: RootState) => state.search,
  )
  const [options, setOptions] = useState(workModes2)
  //  export type OptionType = { value: SearchState['mode']; label: string };
  const isWorkModeOpen = useAppSelector((state) => state.search.isWorkModeOpen)

  //   const CheckboxOption = (props) => {
  //     const { innerProps, isSelected, data } = props;

  //     return (
  //         <div {...innerProps} style={{ display: 'flex', alignItems: 'center' }}>
  //             <input
  //                 type="checkbox"
  //                 checked={isSelected}
  //                 onChange={() => null} // Предотвращаем изменение состояния через чекбокс
  //                 style={{ marginRight: '5px' }} // Отступ между чекбоксом и текстом
  //             />
  //             <label>{data.label}</label>
  //         </div>
  //     );
  // };

  const handleModesChange = (
    newValue: readonly SearchState['modeWork'][],
    actionMeta: ActionMeta<OptionType>,
  ) => {
    // @ts-ignore
    const values = newValue.map((option) => option.value)
    console.log(values)
    const isAnyTimeSelected = values.includes('any')
    // const isAllDayWeekdaysSelected = values.includes("weekdays");
    console.log(actionMeta.action)

    // const isWeekdaysSelected = values.includes("weekdays");
    let updatedValues = [...values]
    // Если выбрано "Любое время", снимаем отметки со всех остальных
    if (isAnyTimeSelected) {
      updatedValues = ['any'] // Оставляем только "Любое время"
    }

    // Обновляем состояние опций
    const updatedOptions = workModes2.map((group) => {
      // @ts-ignore
      if (group.options) {
        return {
          ...group,
          // @ts-ignore
          options: group.options.map((option) => ({
            // @ts-ignore
            ...option,
            // @ts-ignore
            isDisabled: isAnyTimeSelected && option.value !== 'any', // Блокируем остальные опции
          })),
        }
      } else {
        return {
          ...group,
          // @ts-ignore
          isDisabled: isAnyTimeSelected && group.value !== 'any', // Блокируем одиночные опции
        }
      }
    })
    // @ts-ignore
    setOptions(updatedOptions)
    dispatch(setMode(updatedValues)) // Обновляем состояние в Redux
  }

  console.log(modeWork, weekdayTimes)

  const selectedModes = options.flatMap((group) => {
    // @ts-ignore
    if (group.options) {
      // Если у группы есть вложенные опции, фильтруем их
      // @ts-ignore
      return group.options.filter((option) => modeWork.includes(option.value))
    } else {
      // Если это одиночная опция, проверяем её значение
      return modeWork.includes(group.value) ? [group] : []
    }
  })

  const customStyles: StylesConfig = {
    groupHeading: (provided) => ({
      ...provided,
      fontSize: '1em',
      color: 'var(--dark-blue)',
    }),

    container: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: state.isFocused ? '#fcfaf9' : '#fcfaf9',
      border: state.isFocused ? '2px solid #adcde5' : '2px solid #ff9900',
      borderRadius: '4px',
      boxSizing: 'border-box',
      height: '64px',
      padding: '0px',
      textAlign: 'center',
      alignContent: 'space-around',
      caretColor: 'transparent',
      maxHeight: '64px',
      //  border: state.isSelected ? 'none' : 'none', // Линия разделения между индикаторами и полем ввода
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: 'inherit',
      cursor: 'pointer',
      overflow: 'none',
      scrollbarColor: '#023D67 #f1f1f1',
      scrollbarWidth: 'thin',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: '0px',
      width: '0px',
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
      widht: '10px',
      padding: '0px',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: '0px',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '${white}' : 'transparent',
      border: 'none',
      boxShadow: state.isFocused ? 'none' : provided.boxShadow,
      outline: 'none',
      padding: 'inherit',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      overflowY: 'auto',
      textOverflow: 'ellipsis',
      height: '98%',
      scrollbarWidth: 'thin',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '24px',
      color: '#041129',
      paddingLeft: '10px',
      fontFamily: 'Wix Madefor Display',
      marginBottom: '4px',
    }),
    menu: (provided) => ({
      ...provided,
      display: 'flex',
      width: '140%',
      minWidth: '380px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      borderBottom: '2px solid var(--borders, #ADCDE5)',
      background: 'var(--white, #FFF)',
      padding: '8px 16px 4px 12px',
      gap: '8px',
      alignItems: 'flex-start',
      textAlign: 'left',
    }),
    // @ts-ignore
    menuList: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      padding: '0px',
      width: '100%',
      overflowY: 'no-scroll',
      alignItems: 'flex-start',
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '4px',
      paddingLeft: '20px',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected
        ? 'green'
        : state.isFocused
          ? '#e0e0e0'
          : 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'green',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '${white}',
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
  }

  const handleClick = () => {
    dispatch(setWorkModeOpen({ isWorkModeOpen: !isWorkModeOpen }))
    console.log(isWorkModeOpen)
  }

  return (
    <>
      <Select<OptionType, true>
        // @ts-ignore
        value={selectedModes}
        // value={options.flatMap((group) =>
        //   group.options ? group.options.filter((option) => modeWork.includes(option.value)) : []
        // )}
        type="checkbox"
        // @ts-ignore
        onChange={handleModesChange}
        options={options}
        // @ts-ignore
        styles={customStyles}
        className={styles.scrollable_value_container}
        placeholder="Выберите режимы работы"
        isMulti
        // className={styles.select}
        onMenuOpen={handleClick}
        onMenuClose={handleClick}
        tabIndex={0}
        // components={{ Option: CheckboxOption }}
        {...props}
      />

      {children}
    </>
  )
}

export default WorkModeSelector
