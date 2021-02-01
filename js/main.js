'use strict';

//the global vars for the nums array, the turn number, the time at start and the difficult.
var gNumbers;
var gTurnNum;
var gStartTime;
var gCurrDifficult;
//we set interval ech 1 sec to update the time pass from start and update the currTime var.
var timeInterval;

//func to initialize the app, we set the global vals array gNumbers accordins to the difficult,
//set the global turn number back to 1(to start), get again the start time, and render the dom
function init(diff = gCurrDifficult) {
    gNumbers = getNums(diff);
    gTurnNum = 1;
    gStartTime = new Date();
    renderBoard();
    clearInterval(timeInterval);
    timeInterval = null;
    timeInterval = setInterval(updateTime, 1000);
}

//helper func to create nums array and shuffle it, if we dont get the size.
//the defult will be 16 nums, then we retrun the shuffle nums array
function getNums(size = 16) {
    var nums = [];
    for (let i = 0; i < size; i++) {
        nums[i] = i + 1;
    }
    nums.sort(function (a, b) { return Math.random() - 0.5 });
    return nums;
}

//helper func to update the time and then update the dom
function updateTime() {
    var currTime = new Date();
    var diffrent = currTime - gStartTime;
    var second = diffrent / 1000
    currTime = second;

    //update the dom
    var elH5 = document.querySelector('.time h5');
    elH5.innerText = currTime;
}

//function to render the board on the dom, we make nest loop with sqrt of the length of the main
//nums array, we go over all the shuflle nums and add 0ne by one, also we add func cell click,
// then we update the dom with the table and update the turn number.
function renderBoard() {
    var count = 0;
    var strHtml = '';
    for (let i = 0; i < Math.sqrt(gNumbers.length); i++) {
        strHtml += '<tr>'
        for (let j = 0; j < Math.sqrt(gNumbers.length); j++) {
            strHtml += `<td onclick='cellClicked(${gNumbers[count]},this)'>${gNumbers[count++]}</td>`
        }
        strHtml += '</tr>'
    }

    //update the dom table
    var elTbody = document.querySelector('tbody');
    elTbody.innerHTML = strHtml;
    //update turn number in the dom
    var elH5 = document.querySelector('.turn h5');
    elH5.innerText = gTurnNum;
}

//func to change the color of the cell and update the dom, we get the clicked cell element,
//and the number(value), if it equls to the turn numbr, we add the class for chnage color,
// if we get victory we alert meassage and init new game again, also we update the global turn num
function cellClicked(clickedNum, currCell) {
    if (clickedNum === gTurnNum) {
        //update the dom with the class list, and the turn number in the dom
        currCell.classList.add("changeColor")
        var elH5 = document.querySelector('.turn h5');
        elH5.innerText = gTurnNum;
        //if we got yo the end length of number, we alert victory and init the game again.
        if (gTurnNum === gNumbers.length) {
            alert('Victory- well done now lets play again');
            init();
        }
        //update turn number
        gTurnNum++
    }
}

//this func will get the event from value of the level choose and set the global 
//difficult accordingly, then init the board again, according to the difficult
function levelChange(ev) {
    var difficult = ev.target.value;
    gCurrDifficult = difficult * difficult;
    init(difficult * difficult);
}



