// import { useState } from "react";
import type { Input } from "@/Types/types";
import { useController, Control, RegisterOptions } from 'react-hook-form';
// import List from "../List/List";
import { handleKeyPress } from "@/utils/onlyNumbers";
import styles from "./Input.module.scss";
import { InputFieldProps } from "../../../Types/types";
import { InputHTMLAttributes, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserAddress, setAge } from "@/store/searchSlice";
import * as yup from 'yup';
import { getValidationSchema } from "@/utils/getValidationSchema";


const InputItem: React.FC<InputFieldProps>=({
//   title,
//   type,
//   className,  
  placeholder,
//   searchValue,
//   onChangeSearchInput,
//   setSearchValue,
  name, control, rules, children, onChange, validateAddress, onKeyDown,...props 
}) => {

  
  const { field, fieldState: { error } } = useController({
    name: name as string,
    control,
    rules: {
      ...rules,
      validate: async (value) => {
        try {
          await getValidationSchema(name).validate(value);
          return true;
        } catch (error) {
          return (error as yup.ValidationError).message;
        }
      }
    }
  });
   
    const dispatch = useDispatch();
    const [localValue, setLocalValue] = useState(field.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const value = event.target.value;
      setLocalValue(value);
      // let numericValue;
      switch (name) {
        case 'age':
         const numericValue = value.replace(/\D/g, '');
         setLocalValue(numericValue);
          // numericValue = handleKeyPress(value);
          field.onChange(numericValue);
          dispatch(setAge(numericValue));
          // setLocalValue(value);
          break;
        case 'address':
          field.onChange(value);
          // if (value.toLowerCase().startsWith('са')) {
          //   const fullAddress = 'Санкт-Петербург';
          //   setLocalValue(fullAddress);
          //   field.onChange(fullAddress);
          //   dispatch(setUserAddress(fullAddress));
          // } else {
          //   dispatch(setUserAddress(value));
          // }
          break;
        default:
          field.onChange(value);
          if (onChange) {
            onChange(event);
          }
      }
    };
  
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = event.target.value;
  //     setLocalValue(value);
  //     switch (name) {
  //       case 'age':
  //         // if (!/^[0-9]$/.test(value)) {
            
  //             const numericValue = value.replace(/\D/g, '');
  //             field.onChange(numericValue);
  //             dispatch(setAge(numericValue));
  //             setLocalValue(numericValue);
  //         // }
  //         // const value = value.replace(/\D/g, '');
  //         // field.onChange(value);
  //         // dispatch(setAge(value));
  //         break;
  //       case 'address':
  //         field.onChange(value);
  //         if (value.toLowerCase().startsWith('са')) {
  //           const fullAddress = 'Санкт-Петербург';
  //           setLocalValue(fullAddress);
  //           field.onChange(fullAddress);
  //           dispatch(setAddress(fullAddress));
  //         } else {
  //           dispatch(setAddress(value));
  //         }
  //         break;
  //       default:
  //         field.onChange(value);
  //         if (onChange) {
  //           onChange(event);
  //         }
  //     }
  // };
    //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //  console.log(value)
    //     // Проверяем, является ли значение числом или пустой строкой
    //     if (/^\d*$/.test(value)) {
    //         field.onChange(value);
    //         if (name === 'age') {
    //           dispatch(setAge(value));
    //       }
    //       }
    //   };

  return (
    <>
      <div className={styles.searchBlock}>
        {/* <div className={styles.searchBlock__item}> */}
            <input
            // name={name}
            // readOnly
            className={styles.input}
          
          
            //   type="text"
              placeholder={placeholder}
              // value={searchValue}
            //   onChange={onChangeSearchInput}
            {...field}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            // value={name === 'age' ? localValue : field.value}
            value={localValue ?? ''}
            onChange={(e) => {
              handleChange(e);
              // field.onChange(e);
            }}
            // onKeyDown={onKeyDown}
            onKeyDown={handleKeyPress} 
            />
             {children}
            {error && <div className={styles.inputError}>{error.message}</div>}
        
      </div>
    </>
    
  );
};

export default InputItem;