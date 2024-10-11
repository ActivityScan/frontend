import { RiseLoader } from 'react-spinners';

const override = {
  display: 'flex',
  margin: 'auto',
  borderColor: 'red',
};

const Spinner:() => JSX.Element = () => {
  return (
    <div >
      <RiseLoader color="orange" cssOverride={override} size={30} />
    </div>
  );
};

export default Spinner;