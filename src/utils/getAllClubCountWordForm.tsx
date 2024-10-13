export default function getClubCountWordForm(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return ' секций';
    }
  
    switch (lastDigit) {
      case 1:
        return ' секция';
      case 2:
      case 3:
      case 4:
        return ' секции';
      default:
        return ' секций';
    }
  }
  