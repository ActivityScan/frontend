export const getAllForm = (sport: string): string => {
    const lowerSport = sport.toLowerCase();
    if (lowerSport.endsWith('спорт')) {
      return 'Весь';
    } else if (lowerSport.endsWith('гимнастика')) {
      return 'Вся';
    } else {
      return 'Все';
    }
  };
  