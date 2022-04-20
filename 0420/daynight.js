export function dark() {
    document.querySelector('body').style.backgroundColor='black';
    document.querySelector('body').style.color='white';
    document.querySelector('nav').style.backgroundColor='blue';
 
    let as = document.querySelector('nav').querySelectorAll('a');
    for(let i = 0; i<as.length; i++){
        as[i].style.color = 'red';
    }
 }

 export function day(){
     document.querySelector('body').style.backgroundColor='white';
    document.querySelector('body').style.color='black';
    document.querySelector('nav').style.backgroundColor='transparent';
    let as = document.querySelector('nav').querySelectorAll('a');
    for(let i = 0; i<as.length; i++){
        as[i].style.color = 'blue';
    }
 }

 export function change(mode){
     if(mode === 'night'){
         dark();
     }else if(mode === 'day'){
         day();
     }
 }