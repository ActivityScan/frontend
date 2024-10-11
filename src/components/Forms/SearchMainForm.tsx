import styles from "../Forms/SearchMainForm.module.scss"
import SportSelector from "../SportDropdown/SportDropdown"
import InputItem from "../UI/Input/Input"
import { useForm, SubmitHandler,  Resolver } from "react-hook-form"
import {  InputFieldProps, ValidateValues } from "../../Types/types"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { validateAddress } from "@/utils/validateAdress"
import { fetchClubs } from "@/utils/api"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "@/utils/getValidationSchema"
import { unwrapResult } from '@reduxjs/toolkit';
import WorkModeSelector from "../WorkModeSelector/WorkModeSelector"
import { useNavigate } from "react-router-dom"


const SearchMainForm: React.FC<InputFieldProps> = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sport, age, address, modeWork, weekdayTimes } = useAppSelector(state => state.search);
  // const { selectedSports } = useAppSelector(selectSportsFromSearch );
  const  selectedSports  = useAppSelector(state=>state.sports.selectedSports);


  const formResolver: Resolver<ValidateValues> = yupResolver(schema);

    const { handleSubmit, control, formState: { errors } } = useForm<ValidateValues>(
           {mode: 'onChange',
            defaultValues: {
            age: age || '',
            address: address,
            modeWork: modeWork || [],
            sportNames: selectedSports,
            weekdayTimes: weekdayTimes
            },
            resolver: formResolver
          }
    );
    console.log('Form errors:', errors);

   console.log(selectedSports)

   
    const onSubmit: SubmitHandler<ValidateValues> = async (data: ValidateValues) => {
      const sportNames = selectedSports === 'Все виды спорта' ? '' : selectedSports;
      console.log(data);
      try {
        const response = await dispatch(fetchClubs({
          age: data.age,
          address: data.address,
          modeWork: data.modeWork,
          sportNames: sportNames,
          // weekdayTimes: data.weekdayTimes
        })).then(unwrapResult);
       
        console.log('Response data:', response);
        // navigate('/searchresults');
        navigate('/map');
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    
    //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    
    //     // Проверяем, является ли значение числом или пустой строкой
    //     if (type === 'number' && (isNaN(Number(value)) && value !== '')) {
    //       return; // Игнорируем ввод, если это не число
    //     }
    
    //     field.onChange(value); // Обновляем значение в react-hook-form
      ;
      

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <SportSelector control={control} name="sports" children />

            <div className={styles.form__searchBlock}>
              <InputItem
                  control={control} 
                  name="age" 
                  placeholder="Возраст"
                  type="number"
                 
              />
            </div>

            <div className={styles.form__searchBlock}>
              <InputItem 
                  control={control}
                  name="address" 
                  placeholder="Ваш адрес"
                  type="text" 
                  validateAddress={validateAddress}
              />
            </div>

            <div className={styles.form__searchBlock}> 
              <WorkModeSelector 
                control={control} 
                name="mode"
                placeholder="Время работы" 
                children
              />
            </div>

            <button
                type="submit"
                className={styles.form__button}
             >
              Найти секцию
            </button>
        </form>
    )    
}

export default SearchMainForm;