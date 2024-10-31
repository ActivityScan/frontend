// type HandleClickFunction = (item: string) => void;

// export const createHandleKeyPress = (handleClick: HandleClickFunction) => 
//   (e: React.KeyboardEvent<HTMLLIElement>, item: string) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault(); // Предотвращаем стандартное поведение для пробела
//       handleClick(item);
//     }
//   };

export const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, item: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Предотвращаем стандартное поведение для пробела
      handleClick(item);
    }
  };
function handleClick(item: string) {
  throw new Error("Function not implemented.");
}

