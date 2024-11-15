export const getAllForm = (sport: string): string => {
  const lowerSport = sport.toLowerCase()
  if (lowerSport.endsWith('спорт') || lowerSport.endsWith('фитнес')) {
    return 'Выбран весь'
  } else if (
    lowerSport.endsWith('гимнастика') ||
    lowerSport.endsWith('атлетика')
  ) {
    return 'Выбрана вся'
  } else {
    return 'Выбраны все'
  }
}
