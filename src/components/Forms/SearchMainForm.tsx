import styles from '../Forms/SearchMainForm.module.scss'
import SportSelector from '../SportDropdown/SportDropdown'
import InputItem from '../UI/Input/Input'
import { useForm, SubmitHandler, Resolver } from 'react-hook-form'
import { InputFieldProps, ValidateValues } from '../../Types/types'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
// import { validateAddress } from "@/utils/validateAdress";
import { fetchClubs } from '@/utils/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/utils/getValidationSchema'
import { unwrapResult } from '@reduxjs/toolkit'
import WorkModeSelector from '../WorkModeSelector/WorkModeSelector'
import { useNavigate } from 'react-router-dom'
// import { AppDispatch } from '@/store'
// import { useDispatch } from 'react-redux'
import MapAutosuggest from '../Map/MapAutosuggest'
import { useState } from 'react'

const SearchMainForm: React.FC<InputFieldProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)
  const isOpen = useAppSelector((state) => state.sports.isOpen)
  const { age, address, modeWork, weekdayTimes, addressError } = useAppSelector(
    (state) => state.search,
  )
  // const { selectedSports } = useAppSelector(selectSportsFromSearch );
  const selectedSports = useAppSelector((state) => state.sports.selectedSports)
  const userLatitude = useAppSelector((state) => state.search.latitude)
  const userLongitude = useAppSelector((state) => state.search.longitude)
  // @ts-ignore
  const formResolver: Resolver<ValidateValues> = yupResolver(schema)

  const {
    handleSubmit,
    control,
    // formState: { errors },
    // reset,
  } = useForm<ValidateValues>({
    mode: 'onChange',
    defaultValues: {
      age: age || '',
      address: address,
      modeWork: modeWork || [],
      sportNames: selectedSports,
      weekdayTimes: weekdayTimes,
    },
    resolver: formResolver,
  })
  //   console.log("Form errors:", errors);
  // console.log(address);
  console.log(selectedSports)

  const onSubmit: SubmitHandler<ValidateValues> = async (
    data: ValidateValues,
  ) => {
    console.log(data)
    console.log(addressError)
    if (addressError === true) {
      console.log('Address error:', addressError)
      return
    } else {
      try {
        // Если selectedSports равно "Все виды спорта", передаем пустую строку
        const sportNames =
          selectedSports &&
          selectedSports.length > 0 &&
          selectedSports[0] !== 'Все виды спорта'
            ? selectedSports.join(',')
            : ''
        console.log(sportNames)
        // @ts-ignore
        const response: ReturnType<typeof fetchClubs> = await dispatch(
          // @ts-ignore
          fetchClubs({
            // @ts-ignore
            age: data.age || '',
            address: data.address,
            modeWork: data.modeWork,
            // ...(selectedSports !== "Все виды спорта" && {
            //   sportNames: selectedSports.join(","),
            // }),
            sportNames: sportNames, // Используем результат проверки
            longitude: userLatitude.toString(),
            latitude: userLongitude.toString(),
            // weekdayTimes: data.weekdayTimes
          }),
        ).then(unwrapResult)

        console.log('Response data:', response)
        navigate('/searchresults')
      } catch (error) {
        console.error('Error fetching clubs:', error)
      }
    }
  }

  // Добавляем обработчик нажатия Enter на уровень формы
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault() // Отменяем стандартное поведение Enter (отправку формы)
    }
  }
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
    >
      <SportSelector control={control} name="sports" children />
      {/* <span className={styles.form__pad}></span> */}
      {/* <div className={styles.form__searchBlock}> */}
      <InputItem
        control={control}
        name="age"
        placeholder={isActive ? 'от 0 до 18 лет' : 'Возраст'}
        type="number"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />

      <MapAutosuggest
        control={control}
        placeholder="Ваш адрес"
        type="text"
        name="address"
      />

      <WorkModeSelector
        control={control}
        name="mode"
        placeholder="Время работы"
        children
      />

      <button
        type="submit"
        className={isOpen ? styles.form__button_active : styles.form__button}
      >
        Найти
      </button>
    </form>
  )
}

export default SearchMainForm
