// +버튼 클릭 시 수입 및 지출을 입력할 수 있는 폼이 나타나도록 함.

const inputCashForm = document.querySelector("#inputCashForm");
const addCash = document.querySelector("#addCash");
const hideBtn = document.querySelector("#hideBtn");
const hiddenFormInBtn = document.querySelector("#innerBtn");

function onClickBtn(event){
  event.preventDefault();
  inputCashForm.classList.toggle("hidden");
  hideBtn.classList.toggle("hidden");
}

//버튼 클릭 시 폼이 담겨진 div태그를 나타내는 함수 실행.
hideBtn.addEventListener("click",onClickBtn); 
hiddenFormInBtn.addEventListener("click",onClickBtn);