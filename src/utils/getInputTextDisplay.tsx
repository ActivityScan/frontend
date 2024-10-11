import { sports } from "@/mocks";
import { getAllForm } from "./getAllForm";

const getDisplayText = (selectedSports: string[]): string  => {
    let displaySports: string[] = [];
    // Обходим родительские категории (parentSport)
    Object.keys(sports).forEach((parentSport) => {
      const subSports = sports[parentSport];  // Массив подвидов для категории
  
      // Выбираем подвиды, которые выбраны для текущего parentSport
      const selectedSubSports = subSports.filter(subSport => selectedSports.includes(subSport));
  
      // Если все подвиды для родительской категории выбраны или если нет подвидов (например, "Футбол")
      if (selectedSubSports.length === subSports.length && subSports.length > 0) {
        // Добавляем "Все [parentSport]" в массив для отображения
        displaySports.push(`${getAllForm(parentSport)} ${parentSport.toLowerCase()}`);
      } else if (selectedSubSports.length === 0 && selectedSports.includes(parentSport)) {
        // Если выбрана категория без подвидов (например, "Футбол"), добавляем ее
        displaySports.push(parentSport);
      } else {
        // Если выбраны только отдельные подвиды, добавляем их в массив для отображения
        displaySports = [...displaySports, ...selectedSubSports];
      }
    });
  
    return displaySports.join(', ');
  };
   export default getDisplayText;