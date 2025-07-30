const gridControls =(function (){
  const buttons = [
        '/','7', '8','9',
        '*','4', '5','6',
        '-','1', '2', '3',
        '+','0', '.', '=',
        'C'
  ];

  const generateGrid = ()=>{
      const gridSpace = document.querySelector(".buttons");
      buttons.forEach((button, index) =>{
        const btn = document.createElement("button");
        btn.classList.add('button');
        gridSpace.appendChild(btn);
        btn.textContent = button

        if(index % 4 === 0){
          btn.classList.add("first-in-row");
        }
        
        if(btn.textContent === '='){
          btn.classList.add("equal-btn");
        }
      });
  };
  return{
      generateGrid
    }

})();

const calculatorControls = (function(){
  let firstOperand = '';
  let secondOperand = '';
  let operator = '';
  let isTypingSecondOperand = false;
  //calculator logic IIFE
  const calculatorLogic = (function (){

    const operate = (a, op, b)=>{
      a = parseFloat(a);
      b = parseFloat(b);

      switch(op){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return 'Error!!!';
      }
    }
    return{
      operate
    }
  })();
  //calculator screen IIFE
  const screenControls =(function (){
  const screen = document.querySelector("#screen");

  const buttonFunctionality =  ()=>{
    const allBtns = document.querySelectorAll(".buttons button");

      allBtns.forEach(btn => {

          //clear btn event listener
          if(btn.textContent === 'C'){
            btn.addEventListener("click", () =>{
              screen.textContent = '';
              firstOperand = '';
              operator = '';
              secondOperand = '';
              isTypingSecondOperand = false;
            })
            
          }
          //Operator btns even listeners
          else if (['+', '-', '*', '/'].includes(btn.textContent)) {

              btn.addEventListener("click", () => {
              const btnValue = btn.textContent;

              // Handle negative number input
              if (screen.textContent === '' && btnValue === '-') {
                screen.textContent = '-';
                if (!isTypingSecondOperand) {
                  firstOperand = '-';
                } else {
                  secondOperand = '-';
                }
                return;
              }

              // Prevent operator use without a valid number
              if (screen.textContent === '' || screen.textContent === '-') return;

              // If already have a first operand and operator, calculate previous result
              if (firstOperand !== '' && operator !== '' && isTypingSecondOperand) {
                secondOperand = screen.textContent;
                const result = calculatorLogic.operate(firstOperand, operator, secondOperand);
                screen.textContent = result.toString();
                firstOperand = result.toString();
                secondOperand = '';
              } else {
                firstOperand = screen.textContent;
              }

              operator = btnValue;
              isTypingSecondOperand = true;
              screen.textContent = '';
            });
          }
          //equal btn event listener
          else if (btn.textContent === '=') {
            btn.addEventListener("click", () => {
              if (firstOperand !== '' && operator !== '' && screen.textContent !== '') {
                secondOperand = screen.textContent;
                const result = calculatorLogic.operate(firstOperand, operator, secondOperand);
                screen.textContent = result.toString();
                firstOperand = result.toString();
                secondOperand = '';
                operator = '';
                isTypingSecondOperand = false;
              }
            });
          }

          //number btns event listener
          else{
            btn.addEventListener("click", () => {
              screen.textContent += btn.textContent;
              if(isTypingSecondOperand){
                secondOperand = screen.textContent;
              }else{
                firstOperand = screen.textContent;
              }
            });
          }
        });
  }
  return{
    buttonFunctionality
  }
  })();

  return{
    screenControls,
    calculatorLogic
  }
})();

gridControls.generateGrid();
calculatorControls.screenControls.buttonFunctionality();