
import PropTypes from 'prop-types';
import { ACTIONS } from '../constants';

export default function DigitButton({ digit, dispatch }) {
  const handleClick = () => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  };

  const getID = () => {
    switch (digit) {
      case '1':
        return 'one';
      case '2':
        return 'two';
      case '3':
        return 'three';
      case '4':
        return 'four';
      case '5':
        return 'five';
      case '6':
        return 'six';
      case '7':
        return 'seven';
      case '8':
        return 'eight';
      case '9':
        return 'nine';
      case '0':
        return 'zero';
      case '.':
        return 'decimal';
      default:
        return 'symbol';
    }
  };

  return (
    <button onClick={handleClick} className="button" id={getID()}>
      {digit}
    </button>
  );
}

DigitButton.propTypes = {
  digit: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
