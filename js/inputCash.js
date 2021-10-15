//금액을 입력하고 저장하기 버튼을 눌렀을 때 전체 내역 자리로 데이터를 집어넣기(카테고리 value와 함께)
const savebtn = inputCashForm.querySelector("#saveBtn");

function saveCash(event){
  event.preventDefault();
  const inputCash = inputCashForm.querySelector(".inputCash");
  const inputComment = inputCashForm.querySelector(".inputComment");
  const li = document.createElement("li");
  const span = document.createElement("span");
  if(inputCash.value !== ""){ 
    span.innerText = `${inputComment.value} ${inputCash.value}`;

    li.appendChild(span);
    document.querySelector("#detail").appendChild(li);

    inputCash.value = "";
    inputComment.value = "";
  }
}

savebtn.addEventListener("click", saveCash);