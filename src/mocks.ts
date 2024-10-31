import { OptionType, SearchState, Sports } from "./Types/types";
import  OptionTypeBase  from 'react-select';

// названия инпутов на странице Home
export const INPUT_PLACEHOLDERS: {
  id: string;
  placeholder: string;
}[] = [
  // {
  //   id: "1",
  //   placeholder: "Вид спорта",
  // },
  {
    id: "2",
    placeholder: "Возраст",
  },
  {
    id: "3",
    placeholder: "Ваш адрес",
  },
  {
    id: "4",
    placeholder: "Время занятий",
  },
];

export const CATEGORY_SPORTS: {
  id: string;
  title: string;
  list?: { id: string; subtitle: string }[];
}[] = [
  {
    id: "1",
    title: "Водные виды спорта",
    list: [
      {
        id: "1",
        subtitle: "Водное поло",
      },
      {
        id: "2",
        subtitle: "Дайвинг",
      },
      {
        id: "3",
        subtitle: "Плавание",
      },
      {
        id: "4",
        subtitle: "Синхронное плавание",
      },
    ],
  },
  {
    id: "2",
    title: "Единоборства",
    list: [
      {
        id: "1",
        subtitle: "Самбо",
      },
      {
        id: "2",
        subtitle: "Карате",
      },
      {
        id: "3",
        subtitle: "Дзюдо",
      },
    ],
  },
  {
    id: "3",
    title: "Спортивные танцы",
  },
];

export const sports: Sports = {
  // 'Выбрать все': [],
  'Единоборства': ["Самбо", "Карате", "Дзюдо", "Бокс", "МуайТай", "Ушу"],
  'Водные виды спорта': ['Плавание', 'Дайвинг', 'Прыжки в воду'],
  'Футбол': [],
  'Хоккей': [],
  'Гимнастика': ["Художественная гимнастика", "Спортивная гимнастика"],
  'Конный спорт': [],
  'Баскетбол': [],
  'Лыжный спорт': [],
};

export const workModes: OptionType[] = [
  { value: 'any', label: 'Любое время' },
  { value: 'weekdays', label: 'Будние дни' },
  { value: 'saturday', label: 'Суббота' },
  { value: 'sunday', label: 'Воскресенье' },
];

export const weekdayModeTimes: { value: string; label: string }[] = [
  { value: 'all', label: 'Весь день' },
  { value: '6-11', label: '6:00 - 11:00' },
  { value: '11-16', label: '11:00 - 16:00' },
  { value: '16-23', label: '16:00 - 23:00' },
];


export interface OptionType extends OptionTypeBase {
  value: string;
  label: string;
  // options?: OptionType[];
  options?: []  // Для вложенных опций
}

export const workModes2: OptionType[] = [
  { value: 'any', label: 'Любое время' },
  {
    value: 'weekdays',
    label: 'Будние дни',
    options: [
      { value: 'all', label: 'Весь день' },
      { value: '6-11', label: '6:00 - 11:00' },
      { value: '11-16', label: '11:00 - 16:00' },
      { value: '16-23', label: '16:00 - 23:00' },
    ],
  },
  { value: 'saturday', label: 'Суббота' },
  { value: 'sunday', label: 'Воскресенье' },
];
//   Единоборства: ["Самбо", "Карате", "Дзюдо", "Бокс", "МуайТай", "Ушу"],
//   "Водные виды спорта": ["Плавание", "Дайвинг", "Прыжки в воду"],
//   Футбол: [],
//   Хоккей: [],
//   Гимнастика: ["Художественная гимнастика", "Спортивная гимнастика"],
//   "Конный спорт": [],
//   Баскетбол: [],
//   "Лыжный спорт": [],
// };

// моки для 2 экрана карточек спортивных секций
export const MOCK_SPORT_SECTION_ITEMS = [
  {
    mockSportSectionItem: {
      id: "1",
      src: "/images/Mock-img.png",
      title: "Секция 1 длинное название",
      mapSrc: "/images/Mock-map.jpg",
      category: "Вид спорта 1",
      address: "ул. Газовая, д. 10",
      telephone: "+7 (999) 999-99-00",
      sale: "Скидка по промокоду SportScan",
      free: "Бесплатное пробное занятие",
    },
  },
  {
    mockSportSectionItem: {
      id: "2",
      src: "/images/Mock-img.png",
      title: "Секция 2 длинное название",
      mapSrc: "/images/Mock-map.jpg",
      category: "Вид спорта 2",
      address: "ул. Газовая, д. 100",
      telephone: "+7 (999) 999-00-00",
      sale: "Скидка по промокоду SportScan",
      free: "Бесплатное пробное занятие",
    },
  },
  {
    mockSportSectionItem: {
      id: "3",
      src: "/images/Mock-img.png",
      title: "Секция 3 длинное название",
      mapSrc: "/images/Mock-map.jpg",
      category: "Вид спорта 3",
      address: "ул. Газовая, д. 100500",
      telephone: "+7 (999) 999-00-99",
      sale: "Скидка по промокоду SportScan",
      free: "Бесплатное пробное занятие",
    },
  },
];

// моки для 2 экрана карточек количество спортивных секций
export const mockMoreSections = 2541;
