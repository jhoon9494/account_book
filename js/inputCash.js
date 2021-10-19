//금액을 입력하고 저장하기 버튼을 눌렀을 때 합계금액, 수입 및 지출합계 자리로 데이터를 집어넣기(카테고리 text와 함께)
const savebtn = inputCashForm.querySelector("#saveBtn");
let incomeArr = []; //수입 빈 배열
let expendArr = []; //지출 빈 배열

function saveCash(event){
  event.preventDefault();
  const inputCash = inputCashForm.querySelector(".inputCash"); //금액
  const inputComment = inputCashForm.querySelector(".inputComment"); //사용 내역
  const category = inputCashForm.querySelector(".category"); // 카테고리 선택
  const incomeBtn = inputCashForm.querySelectorAll(".radioBtn")[0]; //수입 지출 구분
  const expendBtn = inputCashForm.querySelectorAll(".radioBtn")[1]; //수입 지출 구분
  
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteCash);

  if(inputCash.value !== ""){
    if(incomeBtn.checked === true){ //수입 체크되었을 때 실행
      span.innerText = `${category.value} ${inputCash.value} ${inputComment.value}`;
      incomeArr.push(inputCash.value);

      li.appendChild(span);
      li.appendChild(button);
      document.querySelector("#detail").appendChild(li);
    } else if(expendBtn.checked === true){ //지출 체크되었을 때 실행
      span.innerText = `${category.value} -${inputCash.value} ${inputComment.value}`;
      expendArr.push(inputCash.value);

      li.appendChild(span);
      li.appendChild(button);
      document.querySelector("#detail").appendChild(li);
    }
    
    inputCash.value = ""; //입력 후 금액 입력란 초기화
    inputComment.value = "";//입력 후 사용 내역 입력란 초기화
  } else {
    console.log("금액을 입력해 주세요.");
  }
}

function accountCash(arr){ //누적 금액 계산
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
    sum += arr[i];
  }
  return sum;
}

function deleteCash(event){ //내역 삭제
  const li = event.target.parentElement;
  li.remove();
}

savebtn.addEventListener("click", saveCash);