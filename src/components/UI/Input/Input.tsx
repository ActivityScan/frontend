// import { useState } from "react";
import { useController } from 'react-hook-form'
// import List from "../List/List";
import { handleKeyPress } from '@/utils/onlyNumbers'
import styles from './Input.module.scss'
import { InputFieldProps } from '../../../Types/types'
import { InputHTMLAttributes, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAge } from '@/store/searchSlice'
import * as yup from 'yup'
import { getValidationSchema } from '@/utils/getValidationSchema'

const InputItem: React.FC<InputFieldProps> = ({
  placeholder,
  name,
  control,
  rules,
  children,
  onChange,
  // validateAddress,
  // onKeyDown,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: name as string,
    control,
    rules: {
      ...rules,
      // @ts-ignore
      validate: async (value) => {
        try {
          // @ts-ignore
          await getValidationSchema(name).validate(value)
          return true
        } catch (error) {
          return (error as yup.ValidationError).message
        }
      },
    },
  })

  const dispatch = useDispatch()
  const [localValue, setLocalValue] = useState(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLocalValue(value)
    // let numericValue;
    switch (name) {
      case 'age':
        // eslint-disable-next-line no-case-declarations
        const numericValue = value.replace(/\D/g, '')
        setLocalValue(numericValue)
        // numericValue = handleKeyPress(value);
        field.onChange(numericValue)
        dispatch(setAge(numericValue))
        // setLocalValue(value);
        break
      case 'address':
        field.onChange(value)
        break
      default:
        field.onChange(value)
        if (onChange) {
          onChange(event)
        }
    }
  }

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
          // onFocus={onFocus}
          // onBlur={onBlur}
          // value={searchValue}
          //   onChange={onChangeSearchInput}
          {...field}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          // value={name === 'age' ? localValue : field.value}
          value={localValue ?? ''}
          onChange={(e) => {
            handleChange(e)
            // field.onChange(e);
          }}
          // onKeyDown={onKeyDown}
          onKeyDown={handleKeyPress}
        />
        {children}
        {error && <div className={styles.inputError}>{error.message}</div>}
      </div>
    </>
  )
}

export default InputItem
