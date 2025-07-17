const gridBtns = document.querySelector(".buttons");

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
})

}

generateGrid();