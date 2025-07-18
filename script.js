const gridBtns = document.querySelector(".buttons");
const screen = document.querySelector("#screen");
let firstOperand = '';
let secondOperand = '';
let operator = '';
let isTypingSecondOperand = false;

function generateGrid(){
const buttons = [
  '/','7', '8','9',
  '*','4', '5','6',
  '-','1', '2', '3',
  '+','0', '.', '=',
  'C'
];

buttons.forEach((button,index) =>{
      const btn = document.createElement("button");
      btn.classList.add('button')
      gridBtns.appendChild(btn);
      btn.textContent = button;

    if (index % 4 === 0) {
    btn.classList.add("first-in-row");
    }

    if(btn.textContent === '='){
      btn.classList.add("equal-btn");
    }
})
}

function clearScreen(){
  screen.textContent = '';
  firstOperand = '';
  secondOperand = '';
  operator = '';
  isTypingSecondOperand = false;
}



function buttonEvent() {
  const allBtns = document.querySelectorAll(".buttons button");

      allBtns.forEach(btn => {

        //clear btn event listener
        if(btn.textContent === 'C'){
          btn.addEventListener("click", () =>{
            clearScreen();
          })
          
        } 
        //number btns event listener
        else{
          btn.addEventListener("click", () => {
            screen.textContent += btn.textContent;
          });
        }
      });
    
}

function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch(op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'ERROR!';
    default: return 'ERROR';
  }
}

generateGrid();
buttonEvent();