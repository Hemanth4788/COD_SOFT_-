// Calculator logic
const display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = null;

// Function to handle button clicks
function handleButtonClick(e) {
  const value = e.target.getAttribute("data-value");

  if (!value) return;

  if (value === "C") {
    clear();
    return;
  }

  if (value === "=") {
    calculate();
    return;
  }

  if (["+", "-", "*", "/"].includes(value)) {
    setOperator(value);
    return;
  }

  appendNumber(value);
}

function appendNumber(number) {
  if (currentInput === "0" && number === "0") return; // Avoid leading zeroes
  currentInput = currentInput === "0" ? number : currentInput + number;
  updateDisplay(currentInput);
}

function setOperator(op) {
  if (currentInput === "") return; // Prevent operator without input
  if (previousInput !== "") calculate();
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculate() {
  if (operator === null || currentInput === "") return;
  const result = performCalculation(parseFloat(previousInput), parseFloat(currentInput), operator);
  updateDisplay(result);
  currentInput = result.toString();
  previousInput = "";
  operator = null;
}

function performCalculation(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Error" : a / b;
    default:
      return 0;
  }
}

function clear() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
}

function updateDisplay(value) {
  display.textContent = value.toString().substring(0, 10); // Limit display to 10 characters
}

// Attach event listeners
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", handleButtonClick);
});