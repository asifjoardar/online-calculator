let runningtotal = 0;
let buffer = '0';
let previousoperator = null;
var prev_val = null;
var prev_op = null;
var cur_val = null;

const screen = document.querySelector(".screen");
/*const print_hist = document.querySelector(".print-history");*/
const print_hist = document.querySelector(".print-history");
var hist = new Array();

document.querySelector(".calc-buttons").addEventListener("click", function(event){
    buttonclick(event.target.innerText);
});

document.querySelector(".body").addEventListener("keydown",function(event){
    var value = event.key;
    //console.log(event.key);
    
    if(value === "Enter"){
        value = "=";
    }
    else if(value === "Backspace"){
        value = "←";
    }
    else if(value === "*"){
        value = "×";
    }
    else if(value === "/"){
        value = "÷";
    }
    console.log(event.key);
    buttonclick(value);
    
});

function buttonclick(value){
    if(isNaN(parseInt(value))){
        handlesymbol(value);
    }
    else{
        handlenumber(value);
    }
    if(value === '+' || value === '-' || value === '×' || value === '÷'){
        screen.innerText = value;
    }
    else{
        rerender();
    }
}

function handlenumber(value){
    if(buffer === "0"){
        buffer = value;
    }
    else{
        if(buffer.length<8){
            buffer += value;
        }
    }
}

function handlesymbol(value){
    switch(value){
        case 'C':
            buffer = '0';
            runningtotal = 0;
            previousoperator = null;
            break;
        case '=':
            if(previousoperator === null){
                return;
            }
            flashoperation(buffer);
            if(prev_val && prev_op && cur_val){
                hist.push(`${prev_val} ${prev_op} ${cur_val} = ${runningtotal}`);
                rerender1();
            }
            previousoperator = null;
            buffer = "" + runningtotal;
            runningtotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = "0";
            }
            else{
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        default:
            handlemathvalue(value);
            break;
    }
}

function handlemathvalue(value){
    if(runningtotal === 0){
        runningtotal = parseInt(buffer);
    }
    else{
        flashoperation(runningtotal);
    }
    previousoperator = value;
    buffer = "0";
}

function flashoperation(value){
    prev_val = runningtotal;
    cur_val = value;
    prev_op = previousoperator;
    value = parseInt(value);
    if(previousoperator == '+'){
        runningtotal += value;
    }
    else if(previousoperator == '-'){
        runningtotal -= value;
    }
    else if(previousoperator == '×'){
        runningtotal *= value;
    }
    else{
        runningtotal = (runningtotal / value).toFixed(6);
    }
}

function rerender(){
    screen.innerText = buffer;
}

function rerender1(){
    print_hist.innerText = "";
    let i=hist.length-1;
    let count = 0;
    while(i>=0 && count<13){
        console.log(hist[i]);
        print_hist.innerText += hist[i];
        print_hist.innerText += "\n";
        console.log(print_hist);
        i--;
        count++;
    }
}

document.querySelector(".clear-btn").addEventListener("click",function(){
    print_hist.innerText = "";
    hist = [];
});
