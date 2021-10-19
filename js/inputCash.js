//금액을 입력하고 저장하기 버튼을 눌렀을 때 합계금액, 수입 및 지출합계 자리로 데이터를 집어넣기(카테고리 text와 함께)
const savebtn = inputCashForm.querySelector("#saveBtn");
let incomeArr = []; //수입 빈 배열
let expendArr = []; //지출 빈 배열

function saveCash(event){ //수입 및 지출금액 입력 후 저장버튼 클릭시 발생되는 함수
  event.preventDefault();
  const inputCash = inputCashForm.querySelector(".inputCash"); //금액 입력란
  const inputComment = inputCashForm.querySelector(".inputComment"); //사용 내역 입력란
  const category = inputCashForm.querySelector(".category"); // 카테고리 선택
  const incomeBtn = inputCashForm.querySelectorAll(".radioBtn")[0]; //수입 버튼(radio)
  const expendBtn = inputCashForm.querySelectorAll(".radioBtn")[1]; //지출 버튼(radio)
  
  //세부 내역을 리스트(ul)에 넣기 위한 요소 생성
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteCash);

  if(inputCash.value !== ""){ //금액에 값 입력했을 경우에만 실행
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
    alert("금액을 입력해 주세요.");
  }
  const incomeCash = accountCash(incomeArr); //수입 합계 
  document.querySelector("#totalIncome").querySelector("span").innerText = incomeCash;
  const expendCash = accountCash(expendArr); //지출 합계
  document.querySelector("#totalExpend").querySelector("span").innerText = -expendCash;
  const incomePlusExpend = incomeCash - expendCash; //합계 금액
  document.querySelector("#totalCash").querySelector("span").innerText = incomePlusExpend;
}

function accountCash(arr){ //누적 금액 계산
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
    sum += parseInt(arr[i]); //Number type으로 변환하기 위해 parseInt 사용.
  }
  return sum;
}

function deleteCash(event){ //내역 삭제
  const li = event.target.parentElement;
  const textLi = li.firstChild.firstChild.data; //삭제 버튼 클릭 시, 해당 버튼의 부모인 <li> 내부에 금액 값
  li.remove();
}

savebtn.addEventListener("click", saveCash);