let num1 = null;
let operator = null;
let num2 = null;

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);

  switch(op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default:  return null;
  }
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nice try";
  return a / b;
}

const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.querySelector('.btn-equals');
const clearButton = document.querySelector('#clear');

let displayValue = '0';
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = displayValue;
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  } else if (displayValue === '0') {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function handleOperator(selectedOperator) {
  // If user chains operations (e.g. 5 + 5 +), evaluate first operation
  if (operator !== null && !shouldResetDisplay) {
    evaluate();
  }

  num1 = displayValue;
  operator = selectedOperator;
  shouldResetDisplay = true;
}

function evaluate() {
  // Only return if no operator has been selected yet
  if (operator === null) return;

  // If user presses equals immediately after operator (e.g. 5 + =), use num1 as num2
  num2 = shouldResetDisplay ? num1 : displayValue;
  
  let result = operate(operator, num1, num2);

  if (typeof result === 'number') {
    result = Math.round(result * 1000) / 1000;
  }

  displayValue = String(result);
  updateDisplay();

  // Save result to num1 for subsequent calculations
  num1 = displayValue;
  operator = null;
  shouldResetDisplay = true;
}

function clear() {
  num1 = null;
  operator = null;
  num2 = null;
  displayValue = '0';
  shouldResetDisplay = false;
  updateDisplay();
}

// Event Listeners
digitButtons.forEach((button) => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => handleOperator(button.textContent));
});

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);

// Initialize display on startup
updateDisplay();