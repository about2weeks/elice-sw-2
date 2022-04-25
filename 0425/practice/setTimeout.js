   
    console.log(3);
    
    for(let i = 2; i>=0; i--){
    setTimeout(()=>{
     i==0 ? console.log("끝") : console.log(i);
    }, (3-i)*1000);
    }
    
 
 
 
 
 
    let timer;

    function handler(){
         clearTimeout(timer); //셋 타임이 안 되게 함
      timer = setTimeout(function() {
        alert("입력된 이름: "+inputName.value);
      },1000);
      //입력이 더 안 됐을 경우는 타이머에 일 초 동안 셋타임이 있음
      //그러므로 1초 동안 인풋이 없을 경우 셋 타임 알림이 작동
    }

    inputName.addEventListener("input", handler);