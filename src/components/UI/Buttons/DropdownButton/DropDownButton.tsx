import styles from '@/components/UI/Buttons/DropdownButton/DropdownButton.module.scss';
import { ButtonProps } from '@/Types/types';

const DropdownButton: React.FC<ButtonProps> = ({ onClick, children, onMouseEnter, 
  onMouseLeave  }) => {
  return (
    <button  type="button" className={styles.button} onClick={onClick} onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
      {children}
    </button>
  );
};

export default DropdownButton;