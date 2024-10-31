export const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Backspace' && !/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };