
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faPercent, faTimes, faMinus, faPlus, faBackspace, faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import { ACTIONS } from '../constants';

export default function OperationButton({ dispatch, digit }) {
  const handleClick = () => {
    switch (digit) {
      case 'C':
        dispatch({ type: ACTIONS.CLEAR });
        break;
      case '=':
        dispatch({ type: ACTIONS.EVALUATE });
        break;
      case 'D':
        dispatch({ type: ACTIONS.DELETE_DIGIT });
        break;
      default:
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: digit } });
        break;
    }
  };

  const renderIcon = () => {
    switch (digit) {
      case '/':
        return <FontAwesomeIcon icon={faDivide} />;
      case '*':
        return <FontAwesomeIcon icon={faTimes} />;
      case '%':
        return <FontAwesomeIcon icon={faPercent} />;
      case '-':
        return <FontAwesomeIcon icon={faMinus} />;
      case '+':
        return <FontAwesomeIcon icon={faPlus} />;
      case '+/-':
        return <FontAwesomeIcon icon={faPlusMinus} />;
      case 'D':
        return <FontAwesomeIcon icon={faBackspace} />;
      case '=':
        return "=";
      default:
        return digit;
    }
  };

  const getID = () => {
    switch (digit) {
      case 'C':
        return 'clear';
      case '+':
        return 'add';
      case '-':
        return 'subtract';
      case '*':
        return 'multiply';
      case '/':
        return 'divide';
      case '%':
        return 'percent';
      case 'D':
        return 'deleteBtn';
      case '=':
        return 'equals';
      default:
        return 'symbol';
    }
  };

  const getClassName = () => {
    switch (digit) {
      case 'C':
        return 'clear';
      case '=':
        return 'equals';
      case 'D':
        return 'delete-btn';
      default:
        return 'symbol';
    }
  };

  return (
    <button onClick={handleClick} className={getClassName()} id={getID()}>
      {renderIcon()}
    </button>
  );
}

OperationButton.propTypes = {
  digit: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
