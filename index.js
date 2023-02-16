function operate(op, num1, num2) {
    let ans;
    switch(op) {
        case "multiply":
            ans = num1 * num2;
            break;
        case "plus":
            ans = num1 + num2;
            break;
        case "minus":
            ans = num1 - num2;
            break;
        case "divide":
            if (num2 === 0) {
                return "ERROR"
            }
            ans = num1 / num2;
            break;
    }
    return ans;
}

const res = {
    initial: 0,
    opBool: false,
    op: undefined,
    initial2: 0,
}

const nums = document.querySelectorAll(".num");
const ops = document.querySelectorAll(".op");
nums.forEach(btn => btn.addEventListener('click', addToScreen));
ops.forEach(op => op.addEventListener('click', opProcess));

function opProcess(e) {
    const screen = document.querySelector("#result-screen");
    const screen2 = document.querySelector("#initial-screen");
    if (res.opBool === true && e.target.id != "equals") {
        res.initial = operate(res.op, res.initial, res.initial2);
        res.opBool = true;
        res.op = e.target.id;
        res.initial2 = 0;
    
        screen2.textContent = res.initial + e.target.textContent;
        

    }
    else if (e.target.id === "equals"){
        res.initial = operate(res.op, res.initial, res.initial2);
        res.opBool = false;
        res.op = undefined;
        res.initial2 = 0;
        screen2.textContent = res.initial;
    }
    else {
        screen2.textContent = screen2.textContent + e.target.textContent;
        res.op = e.target.id;
        res.opBool = true;
    }
    console.log(res)
}


function addToScreen(e) {
    const screen = document.querySelector("#initial-screen");
    if (res.initial === 0) {
        screen.textContent = e.target.textContent;
    }
    else {
        screen.textContent = screen.textContent + e.target.textContent;
    }

    if (res.opBool === true) {
        res.initial2 = res.initial2 * 10 + parseInt(e.target.textContent);
    }
    else {
        res.initial = res.initial * 10 + parseInt(e.target.textContent);
    }
    console.log(res)
};


const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");
del.addEventListener('click', function (e) {
    const screen = document.querySelector("#initial-screen");
    if (res.opBool === true) {
        if (res.initial2 === 0) {
            res.op = undefined;
            res.opBool = false;
        }
        else {
            res.initial2 = (res.initial2 - (res.initial2 % 10)) / 10
        }
        screen.textContent = screen.textContent.slice(0,-1);
    }
    else {
        if (res.initial != 0) {
            screen.textContent = screen.textContent.slice(0,-1);
            res.initial = parseFloat(screen.textContent);
        }
    }
})

clear.addEventListener('click', function() {
    const screen = document.querySelector("#initial-screen");
    res.initial = 0;
    res.initial2 = 0;
    res.op = undefined;
    res.opBool = false;
    screen.textContent = 0; 
})