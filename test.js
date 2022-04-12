function add(x, y){
    if(typeof x =="number"){
        var sum = 0;
        sum = x+y;
    }else{
        var sum = "";
        sum = x+y;
    }
    
    return sum;
}




var num1 = 1;
var num2 = 3;

document.write(num1,num2);
document.write(add(num1, num2));