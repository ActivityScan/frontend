export default function getWordForm(
  count: number,
  unit: 'секция' | 'раз',
): string | undefined {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (unit === 'секция') {
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${count} секций`
    }
    switch (lastDigit) {
      case 1:
        return `${count} секция`
      case 2:
      case 3:
      case 4:
        return `${count} секции`
      default:
        return `${count} секций`
    }
  } else if (unit === 'раз') {
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${count} раз`
    }
    switch (lastDigit) {
      case 1:
        return `${count} раз`
      case 2:
      case 3:
      case 4:
        return `${count} раза`
      default:
        return `${count} раз`
    }
  }
}
