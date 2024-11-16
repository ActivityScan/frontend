import styles from './Input.module.scss'
import { InputFieldProps } from '../../../Types/types'

const InputSports: React.FC<InputFieldProps> = ({ children }) => {
  // const handleMouseEnter = (sport: string) => {
  //   setHoveredSportOnInput(sport)
  //   // Логика для зачеркивания при наведении
  // }

  // const handleMouseLeave = () => {
  //   setHoveredSportOnInput(null)

  //   // Логика для отмены зачеркивания
  // }

  // const handleClick = (sport: string) => {

  //   dispatch(selectSport(sport)) // Обновляем Redux состояние
  //   console.log(selectedSports)
  // }

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
      <div className={styles.sportItem__child}>
        {children ? children : 'No children found'}{' '}
        {/* Показываем сообщение если детей нет */}
      </div>
      {/* {fieldState.error && <div className={styles.inputError}>{fieldState.error.message}</div>} */}
    </>
  )
}

export default InputSports
