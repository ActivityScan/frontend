import { Control, RegisterOptions, useController } from 'react-hook-form'
import React from 'react'
import { RootState } from '@/store'

export type Input = {
  title: string
  type: string
  className?: string
  placeholder: string
  searchValue: string
  setSearchValue: (value: string) => void
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type List = {
  id: string
  title: string
  searchValue: string
  list?: [
    {
      id: string
      subtitle: string
    },
  ]
}

//типизация выбранных видов спорта и подкатегорий на главной
export interface Sports {
  [key: string]: string[]
}
export interface FormValues {
  name?: string | undefined
  sports?: string
  age?: number
  address?: string
  modeWork?: string | [string]
  handleSubmit?: () => void
  weekdayTimes?: string[]
}

export interface InputFieldProps {
  id?: string | undefined
  title?: string
  name?: string
  control?: Control<any> // Замените 'any' на тип вашей формы
  rules?: RegisterOptions
  placeholder?: string
  type?: string
  value?: string | [string] | undefined
  readOnly?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onSearch?: (value: string) => void
  className?: string
  onRemove?: (value: string) => void
  suggestions?: string[]
  onSuggestionSelect?: (value: string) => void
  field?: ReturnType<typeof useController>
  children?: React.ReactNode
  validateAddress?: (value: string) => true | string
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  // select?: boolean;
}

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

// declare module 'react-autosuggest' {
//   import * as React from 'react';

// export interface Suggestion {
//   name: string;
// }

export interface SuggestProps {
  suggestions: Suggestion[]
  onSuggestionsFetchRequested: (params: { value: string }) => void
  onSuggestionsClearRequested: () => void
  getSuggestionValue: (suggestion: Suggestion) => string
  renderSuggestion: (suggestion: Suggestion) => React.ReactNode
  inputProps: {
    placeholder: string
    value: string
    onChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      params: {
        newValue: string
      },
    ) => void
    onFocus: () => void
  }
}

// export default class Autosuggest extends React.Component<SuggestProps> {}
export interface Suggestion {
  name: string
  organization?: string
  city?: string
  street?: string
  housenumber?: string
  coordinates?: [number, number]
  district?: string
}

export type MenuItem = {
  id: string
  label: string
  icon?: React.ReactNode // Optional icon
}
export type MenuProp = {
  items: MenuItem[]
}
export type SubMenuProp = {
  items?: MenuItem[]
  onClick: (item: MenuItem) => void // Callback when an item is clicked
}

export interface MenuProps {
  items?: string[]
  onHover?: (item: string) => void
  onClick?: (item: string) => void
  selectedItems?: string[]
  disabled?: boolean
  ref?: React.Ref<HTMLDivElement>
  parentSport?: { name: string } | null // or { name: string } | undefined
}

export interface Sport {
  id: number // Идентификатор вида спорта
  name: string // Название вида спорта
}

export interface SubSport {
  id: number // Идентификатор подвига спорта
  name: string // Название подвига спорта
}

export interface SubMenuItem {
  id: number
  name: string
}

export interface SportCategory {
  id: number // Идентификатор категории
  name: string // Название категории
  sports: Sport[] // Массив видов спорта, относящихся к этой категории
}

export interface SubMenuProps {
  items: SubMenuItem[]
  onClick: (item: string) => void
  selectedItems?: SubSport[]
  parentSport: SportCategory
  onSelectAll: (sport: string, items: SubSport[]) => void
  disabled?: boolean
}

export interface SportsState {
  selectedSports: string[]
  allSportsSelected: boolean
  hoveredSport: string | null
  suggestions: string[]
  isAllParentSportsSelected?: boolean
  loading?: boolean
  isOpen: boolean
}

export interface Store {
  sports: SportsState
  search: SearchState
}

export interface SearchState {
  // modeWork?: "any" | "weekdays" | "saturday" | "sunday" | "all" | "none";
  modeWork: string[] | string
  weekdayTimes: string[]
  // sport: string[];
  age?: string | undefined
  address?: string
  clubs: ClubsType
  status: 'idle' | 'loading' | 'failed' | 'succeeded'
  error: string | null
  loading?: boolean
  // options:
  longitude?: string | number
  latitude?: string | number
  sport?: string[] | string
  sportTypes: ServerSportTypesResponse
  addressError?: boolean
  clubsVisibility?: ClubsVisibility
  isAutosuggestOpen?: boolean
  isWorkModeOpen?: boolean
}

export type ClubsVisibility = {
  [clubId: number]: boolean
}
export interface Sport {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
  sports: Sport[]
}

export type ServerSportTypesResponse = Category[]

export type OptionType = {
  value: SearchState['modeWork']
  label: string
  isDisabled?: boolean
  // onChange?: (value: SearchState['modeWork']) => void
  // styles?: React.CSSProperties

  // | { value: string; label: string }
  // | { value: string; label: string; options: OptionType[] }
}

// export interface ValidateValues {
//   handleSubmit?: () => void;
//   sports?: [string];
//   modeWork?: string | [string];
//   age?: number ;
//   address?: string;
//   weekdayTimes?: string[]
//   formResolver?: (string | undefined)[];
// }
export interface ValidateValues {
  age: number
  address?: string
  weekdayTimes?: (string | undefined)[]
  modeWork?: (string | undefined)[]
  sports?: (string | undefined)[]
  sportNames?: string[]
  selectedSports?: SportsState['selectedSports']
  longitude?: string | number
  latitude?: string | number
}

// export const formResolver: Resolver<ValidateValues, any> = yupResolver(schema);

//типизация секций
export interface Country {
  id: number
  name: string
}

export interface City {
  id: number
  name: string
  country: Country
}

export interface Franchise {
  id: number
  name: string
}

export interface Company {
  id: number
  inn: number
  ogrn: string
  name: string
  companyType: string
  city: City
}

export interface Sport {
  id: number
  name: string
}

export interface CustomInfo {
  sport: string
  trackLength: number
}

export interface SportFederation {
  id: number
  name: string
  sportFederationType: string
}

interface PhoneNumber {
  id: number
  phoneNumber: string
  description: string
  priority: number
}

export interface Club {
  id: number
  name: string
  franchise: Franchise
  company: Company
  city: City
  sport: Sport
  customInfo: CustomInfo
  address: string
  sportFederation: SportFederation
  basicInfo: string
  ageMin: number
  ageMax: number
  adultGroups: boolean
  parentParticipation: boolean
  differentLevels: boolean
  longitude: number
  latitude: number
  phoneNumbers: PhoneNumber[]
  status: string
  error: null | string
  loading?: boolean
}

// Тип для массива клубов
export type ClubsType = Club[]

// export interface InitialStateClub  {
//   clubInfo:ClubsType[]
// }

export interface ClubInitialState {
  data: Club | null
  loading: boolean
  error: null | string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  chosenClubLongitude: number
  chosenClubLatitude: number
}

export interface AsyncThunkConfig {
  state: RootState // Укажите состояние, если это необходимо
  // Вы также можете добавить другие параметры, такие как rejectValue
  rejectValue: string // Например, для обработки ошибок
}
