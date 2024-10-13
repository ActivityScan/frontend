import { RiseLoader } from 'react-spinners';

const spinnerContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
  zIndex: 9999, // Убедиться, что спиннер отображается поверх других элементов
};

const override = {
  display: 'flex',
  margin: 'auto',
  borderColor: 'red',
};

const Spinner:() => JSX.Element = () => {
  return (
    <div style={spinnerContainerStyle}>
      <RiseLoader color="orange" cssOverride={override} size={30} />
    </div>
  );
};

export default Spinner;