export const validateAddress = (value: string) => {
    if (value && !value.toLowerCase().startsWith('са')) {
      console.log('Поиск доступен только в городе Санкт-Петербург');
      return 'Поиск доступен только в городе Санкт-Петербург';
    }
    return true;
  };