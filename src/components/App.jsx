import { useReducer } from 'react';
import '/src/App.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import { ACTIONS } from '../constants';

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currOperand === "0") return state;
      if (payload.digit === "." && state.currOperand.includes(".")) return state;
      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`
      };
    case ACTIONS.CLEAR:
      return {
        currOperand: '0',
        prevOperand: null,
        operation: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currOperand: null,
          overwrite: false,
        };
      }
      if (state.currOperand == null) return state;

      if (state.currOperand.length === 1) {
        return {
          ...state,
          currOperand: null,
        };
      }

      return {
        ...state,
        currOperand: state.currOperand.slice(0, -1)
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.prevOperand === null && state.currOperand === '') {
        return state;
      }

      if (state.currOperand === '') {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.prevOperand === null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currOperand,
          currOperand: '',
        };
      }

      return {
        ...state,
        operation: payload.operation,
        prevOperand: evaluate(state),
        currOperand: '',
      };

    case ACTIONS.EVALUATE:
      if (state.operation == null || state.prevOperand == null || state.currOperand == null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation: null,
        currOperand: evaluate(state),
      };

    default:
      return state;
  }
}

function evaluate({ currOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand);
  const current = parseFloat(currOperand);

  if (isNaN(prev) || isNaN(current)) return '';

  let compute = '';

  switch (operation) {
    case '+':
      compute = prev + current;
      break;
    case '-':
      compute = prev - current;
      break;
    case '*':
      compute = prev * current;
      break;
    case '/':
      compute = prev / current;
      break;
    case '%':
      compute = (prev / current) * 100;
      break;
    default:
      compute = '';
  }
  return compute.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {
    currOperand: '',
    prevOperand: null,
    operation: null
  });

  return (
    <div className="overall">
      <div className="calc-body">
        <div id="display" className="input-area">
          <div className='prev-operand'>{formatOperand(prevOperand)} {operation}</div>
          <div className='curr-operand'>{formatOperand(currOperand)}</div>
        </div>
        <div className="buttons-row">
          <OperationButton dispatch={dispatch} digit='C' />
          <OperationButton dispatch={dispatch} digit='(' />
          <OperationButton dispatch={dispatch} digit='%' />
          <OperationButton dispatch={dispatch} digit='/' />
        </div>
        <div className="buttons-row">
          <DigitButton digit='7' dispatch={dispatch} />
          <DigitButton digit='8' dispatch={dispatch} />
          <DigitButton digit='9' dispatch={dispatch} />
          <OperationButton dispatch={dispatch} digit='*' />
        </div>
        <div className="buttons-row">
          <DigitButton digit='4' dispatch={dispatch} />
          <DigitButton digit='5' dispatch={dispatch} />
          <DigitButton digit='6' dispatch={dispatch} />
          <OperationButton dispatch={dispatch} digit='-' />
        </div>
        <div className="buttons-row">
          <DigitButton digit='1' dispatch={dispatch} />
          <DigitButton digit='2' dispatch={dispatch} />
          <DigitButton digit='3' dispatch={dispatch} />
          <OperationButton dispatch={dispatch} digit='+' />
        </div>
        <div className="buttons-row">
          <OperationButton dispatch={dispatch} digit='+/-' />
          <DigitButton digit='0' dispatch={dispatch} />
          <DigitButton digit='.' dispatch={dispatch} />
          <OperationButton dispatch={dispatch} digit='=' />
        </div>
      </div>
    </div>
  );
}

export default App;
