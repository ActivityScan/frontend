import { getAllForm } from '@/utils/getAllForm'

const getDisplayText = (selectedSports: string[], sports: any): string[] => {
  const displaySports: string[] = []

  // Перебираем каждую категорию, чтобы проверить, выбраны ли все виды спорта в ней
  sports.forEach((category: { sports: any[]; name: string }) => {
    // Проверяем, выбраны ли все виды спорта в категории
    const isCategoryFullySelected = category.sports.every(
      (sport: { name: string }) => selectedSports.includes(sport.name),
    )

    // Если все виды спорта в категории выбраны, добавляем название категории в текст для отображения
    if (isCategoryFullySelected) {
      displaySports.push(
        `${getAllForm(category.name.toLowerCase())} ${category.name.toLowerCase()}`,
      )
    }
  })

  // Добавляем отдельные виды спорта, которые не покрываются полностью выбранной категорией
  selectedSports.forEach((sport) => {
    // Проверяем, входит ли вид спорта в уже выбранную категорию
    const isSportInFullCategory = sports.some(
      (category: { sports: { name: string }[] }) =>
        category.sports.every((sportInCategory: { name: string }) =>
          selectedSports.includes(sportInCategory.name),
        ) &&
        category.sports.some(
          (sportInCategory: { name: string }) => sportInCategory.name === sport,
        ),
    )

    // Если вид спорта не входит в выбранные категории, добавляем его в текст для отображения
    if (!isSportInFullCategory) {
      displaySports.push(sport)
    }
  })

  return displaySports
}

export default getDisplayText

export const extractCategoryName = (text: string): string => {
  // Преобразуем текст в нижний регистр для удобства обработки
  const lowerText = text.toLowerCase()

  // Регулярное выражение для поиска слова "весь", "вся" и оставления остальных слов с большой буквы
  const cleanedText = lowerText
    .replace(/(выбраны все|выбран весь|выбрана вся)/i, '')
    .trim()

  return cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1)
}
