import { useState } from "react";
import type { Input } from "../../../Types/types";

import List from "../List/List";
import { useForm} from 'react-hook-form';
import styles from "./Input.module.scss";
import InputItem from "./Input";
import {FormValues} from "../../../Types/types";


const InputBar = ({
  placeholder,
  searchValue,
  onChangeSearchInput,
  setSearchValue,
}: Input) => {
  const [openSelect, setOpenSelect] = useState(false);
  const { control } = useForm<FormValues>();
  const onOpenSelect = (searchValue: string) => {
    console.log(searchValue);
    setOpenSelect(!openSelect);
  };

  return (
    <>
      <div className={styles.searchBlock}>
        <InputItem
          className={styles.input}
          title="Начните вводить"
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={onChangeSearchInput}
          control={control}
          name="sports"
        />
        {searchValue && (
          <div className={styles.clearBlock__buttons}>
            <img
              className={styles.clear}
              src="/icons/close.svg"
              alt="Clear"
              onClick={() => setSearchValue("")}
            />
            <img
              className={styles.clear}
              src="/icons/checked.svg"
              alt="Checked"
              onClick={() => onOpenSelect(searchValue)}
            />
          </div>
        )}
        {searchValue && <List searchValue={searchValue} />}
      </div>
      {/* <div>{openSelect && <Select />}</div> */}
    </>
  );
};

export default InputBar;
