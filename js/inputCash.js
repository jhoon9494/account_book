//금액을 입력하고 저장하기 버튼을 눌렀을 때 합계금액, 수입 및 지출합계 자리로 데이터를 집어넣기(카테고리 text와 함께)
const savebtn = inputCashForm.querySelector("#saveBtn");
let incomeArr = []; //수입 빈 배열
let expendArr = []; //지출 빈 배열

function saveCash(event){ //수입 및 지출금액 입력 후 저장버튼 클릭시 발생되는 함수
  event.preventDefault();
  const ul = document.querySelector("#detail"); //세부 내역 리스트
  const inputCash = inputCashForm.querySelector(".inputCash"); //금액 입력란
  const inputComment = inputCashForm.querySelector(".inputComment"); //사용 내역 입력란
  const category = inputCashForm.querySelector(".category"); // 카테고리 선택
  const categoryIndex = category.selectedIndex;
  const incomeBtn = inputCashForm.querySelectorAll(".radioBtn")[0]; //수입 버튼(radio)
  const expendBtn = inputCashForm.querySelectorAll(".radioBtn")[1]; //지출 버튼(radio)
  
  //세부 내역을 리스트(ul)에 넣기 위한 요소 생성
  const li = document.createElement("li");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteCash);

  if(inputCash.value !== ""){ //금액에 값 입력했을 경우에만 실행
    if(incomeBtn.checked === true && inputCash.value < 0){ //수입 체크되었으나 값이 음수일 경우 지출 처리
      span1.innerText = `${category[categoryIndex].innerText}`;
      span2.innerText = ` ${inputCash.value} `;
      span3.innerText = `${inputComment.value}`;
      expendArr.push(-inputCash.value); //지출 배열에 양수로 집어넣기 위해 (-)부호 추가(data type = Number)

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
      li.appendChild(button);
      ul.appendChild(li);  
    } else if(incomeBtn.checked === true){ //수입 체크되었을 때 실행 
      span1.innerText = `${category[categoryIndex].innerText}`;
      span2.innerText = ` ${inputCash.value} `;
      span3.innerText = `${inputComment.value}`;
      incomeArr.push(inputCash.value);

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
      li.appendChild(button);
      ul.appendChild(li);
    } else if(expendBtn.checked === true && inputCash.value > 0){ //지출 체크되었을 때 실행
      span1.innerText = `${category[categoryIndex].innerText}`;
      span2.innerText = ` ${-inputCash.value} `; //음수 표시를 위해 (-)부호 사용
      span3.innerText = `${inputComment.value}`;
      expendArr.push(parseInt(inputCash.value)); //expendArr 내부 자료형을 Number로 통일하기 위해 parseInt()사용(Number()도 가능)

      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
      li.appendChild(button);
      ul.appendChild(li);
    }
    
    inputCash.value = ""; //입력 후 금액 입력란 초기화
    inputComment.value = "";//입력 후 사용 내역 입력란 초기화
  } else {
    alert("금액을 입력해 주세요.");
  }

  //수입, 지출 합계 및 합계 금액 계산
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
  const li = event.target.parentElement; //해당 삭제 버튼의 부모요소
  //cashData = 삭제할 금액, trim()을 이용하여 공백제거(공백 제거하지 않을 경우 indexOf()의 값이 제대로 나오지 않음)
  const cashData = li.querySelectorAll("span")[1].innerText.trim(); //해당 삭제 버튼의 금액 값

  if(cashData >= 0) { // 수입일 경우
    const incomeArrIndex = incomeArr.indexOf(cashData); //수입 배열에서 삭제할 금액의 인덱스값 찾기
    incomeArr.splice(incomeArrIndex, 1); //수입 배열에서 삭제할 금액의 인덱스 제거
  } else {// 지출일 경우
    //expendArr 내부 값은 모두 양수이므로 cashData을 사용하여 얻어낸 금액 값에 (-)부호를 이용하여 양수로 전환
    const expendArrIndex = expendArr.indexOf(-cashData); 
    expendArr.splice(expendArrIndex, 1);
  }
  
  li.remove();
  const incomeCash = accountCash(incomeArr); //수입 합계 
  document.querySelector("#totalIncome").querySelector("span").innerText = incomeCash;
  const expendCash = accountCash(expendArr); //지출 합계
  document.querySelector("#totalExpend").querySelector("span").innerText = -expendCash;
  const incomePlusExpend = incomeCash - expendCash; //합계 금액
  document.querySelector("#totalCash").querySelector("span").innerText = incomePlusExpend;
}

savebtn.addEventListener("click", saveCash);