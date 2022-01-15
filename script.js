const numberKey = document.querySelectorAll('[data-num]');
const operatorKey = document.querySelectorAll('[data-op]');
const decimalKey = document.querySelector('[data-decimal]');
const equalsKey = document.querySelector('[data-equals]');
const backspaceKey = document.querySelector('.backspace');
const clearKey = document.querySelector('[data-clear]');
const inputField = document.querySelector('.input');
const outputField = document.querySelector('.output');
const calculations = document.querySelector('.calculations');
const previousCalculations = [];
let userInput = '';
let storedOutput = ''
let currentOperation = null;
let previousOperation = null;

// set up listener on each number key, input value of key on press
numberKey.forEach((key) => key.addEventListener('click', () => inputNumber(key.textContent)))

// set up listener on each operator key, input value of key on press
operatorKey.forEach((key) => key.addEventListener('click', () => inputOperator(key.textContent)))

// set up listeners for all other keys
decimalKey.addEventListener('click', inputDecimal)
equalsKey.addEventListener('click', equals)
backspaceKey.addEventListener('click', backspace)
clearKey.addEventListener('click', clearData)

// when num key pressed, append value to end of input string
function inputNumber(input){
    if (inputField.textContent == '0'){
        inputField.textContent = ''
    }
    inputField.textContent += input;
}

// when decimal key pressed, check if decimal present, if not then append to end of input string
function inputDecimal(){
    if (inputField.textContent == ''){
        inputField.textContent = '0'
    }
    else if (inputField.textContent.includes('.')){
        return;
    }
    else inputField.textContent += '.'
}

function inputOperator(operator){
    currentOperation = operator; 
    
    // if there is no input, do nothing
    if (inputField.textContent == '0'){
        previousOperation = operator;
        outputField.textContent = `${storedOutput} ${currentOperation}`
        return;
    }
    // setup for start of program - initial operation is measured against null so have ignore 
    if (previousOperation == null ){
        previousOperation = currentOperation;
    }
    // if input operator is not equal to previous one, do the previous calculation
    if (operator != previousOperation){
        operate(previousOperation)
        previousOperation = operator;
    }
    else 
        operate(operator)
        previousOperation = operator;
}

function operate(operator){
    // if output stored of previous calculation, use that for calculation
    if (storedOutput != ""){
        a = storedOutput;
        b = inputField.textContent;
        compute(operator, a, b);
    }
    // if there is no previous calculation, use stored number + current input for calculation
    else if (outputField.textContent != "" && previousOperation != null){
        a = userInput;
        b = inputField.textContent;
        compute(operator, a, b);
    }
    updateDisplay(operator);
 }  
 
 function updateDisplay(operator){
    if (operator == null){
        outputField.textContent = `${userInput} ${currentOperation}`
    }
    if (storedOutput == ''){
        userInput = inputField.textContent;
        outputField.textContent = `${userInput} ${currentOperation}`
        clearDisplay();
        }
    else if (storedOutput != ''){
        userInput = inputField.textContent;
        outputField.textContent = `${storedOutput} ${currentOperation}`
        clearDisplay();
    }
 }

 function equals(){
     if (inputField.textContent == '0'){
         return;
     }
     if (currentOperation == null){
         storedOutput = inputField.textContent;
         outputField.textContent = `${storedOutput} = ${inputField.textContent}`
         clearDisplay();
     }
     else if (storedOutput != ''){
         a = parseInt(storedOutput);
         b = parseInt(inputField.textContent)
         operator = previousOperation;
         compute(previousOperation, a, b)
         clearDisplay();
     }
     else if (storedOutput == ''){
        a = parseInt(userInput);
        b = parseInt(inputField.textContent)
        operator = currentOperation;
        compute(currentOperation, a, b)
        clearDisplay();
    }
 }

function compute(operator, a, b){
    a = parseInt(a);
    b = parseInt(b);
    if (operator == '+'){
        add(a, b)
    }
    else if (operator == '-'){
        subtract(a, b)
    }
    else if (operator == '×'){
        multiply(a, b)
    }
    else if (operator == '÷'){
        divide(a, b)
    }
    else if (operator == '%'){
        percent(a, b)
    }
}

function add(a, b){
    storedOutput = a + b;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} + ${b} = ${storedOutput}`)
}

function subtract(a, b){
      storedOutput = a - b;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} - ${b} = ${storedOutput}`)
}

function multiply(a, b){
    storedOutput = a * b;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} × ${b} = ${storedOutput}`)
}

function divide(a, b){
    if (a == '0' || b == '0' || a == '0' && b == '0'){
        console.log("Divide by zero.")
        return;
    }
    else 
        storedOutput = a / b;
        outputField.textContent = `${storedOutput}`;
        updateCalculations(`${a} ÷ ${b} = ${storedOutput}`)
}

function percent(a, b){
    if (a == '0' && b == '0'){
        outputField.textContent = "Not possible."
    }
    storedOutput = (100 * a) / b;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} % ${b} = ${storedOutput}`)
}

function clearDisplay(){
    inputField.textContent = '0'
}

function clearData() {
    inputField.textContent = '0';
    outputField.textContent = '';
    userInput = '';
    storedOutput = '';
    output = '';
}

function backspace() {
    inputField.textContent = inputField.textContent.slice(0, -1);
    if (inputField.textContent == ''){
        inputField.textContent = '0'
    }
}

// push calculation to list and add to a list on page
function updateCalculations(content) {
    previousCalculations.push(content)
    let li = document.createElement('li');
    li.innerText = content;
    calculations.appendChild(li);
    updateScroll(); 
}

// keep calculation list element scrolled to bottom to show most recent calculations
function updateScroll(){
    calculations.scrollTop = calculations.scrollHeight;
    inputField.scrollTop = calculations.scrollHeight;
    outputField.scrollTop = calculations.scrollHeight;
}

// setup keyboard listener - condense function later
document.addEventListener('keydown', function (e) {
    if (e.key === '1') {
        inputNumber('1')
        updateScroll(); 
    }
    if (e.key === '2') {
        inputNumber('2')
    }
    if (e.key === '3') {
        inputNumber('3')
    }
    if (e.key === '4') {
        inputNumber('4')
    }
    if (e.key === '5') {
    inputNumber('5')
    }
    if (e.key === '6') {
    inputNumber('6')
    }
    if (e.key === '7') {
    inputNumber('7')
    }
    if (e.key === '8') {
    inputNumber('8')
    }
    if (e.key === '9') {
    inputNumber('9')
    }
    if (e.key === '0') {
    inputNumber('0')
    }
    if (e.key === '.') {
    inputDecimal()
    }
    if (e.key === '=' || e.key === 'Enter') {
    equals()
    }
    if (e.key === 'c' || e.key === 'Escape' || e.key === 'C') {
    clearData()
    }
    if (e.key === 'Backspace') {
    backspace()
    }
    if (e.key === '%') {
    inputOperator('%')
    }    
    if (e.key === '+') {
    inputOperator('+')
    }
    if (e.key === '-') {
    inputOperator('-')
    } 
    if (e.key === '*') {
    inputOperator('×')
    } 
    if (e.key === '/') {
    inputOperator('÷')
    }
});