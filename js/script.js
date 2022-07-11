"use strict";
class Smartphone {
    constructor(userName, carica, numeroChiamate) {
        this._carica = 0;
        this._numeroChiamate = 0;
        this._userName = userName;
        this._carica = carica;
        this._numeroChiamate = numeroChiamate;
    }
    get userName() { return this._userName; }
    ;
    get carica() { return this._carica; }
    ;
    get numeroChiamate() { return this._numeroChiamate; }
    ;
    set userName(userName) { this._userName = userName; }
    ;
    set carica(carica) { this._carica = carica; }
    ;
    set numeroChiamate(numeroChiamate) { this._numeroChiamate = numeroChiamate; }
    ;
    ricarica(amount) {
        this._carica = this._carica + amount;
    }
    chiamata() {
        if (this._carica >= 0.50) {
            this._numeroChiamate++;
        }
    }
    durataChiamata(amount) {
        if (this._carica >= 0.20) {
            this._carica = this._carica - amount;
        }
        else {
            alert('Il tuo credito non è sufficiente! Fai un top-up.');
            resetTimer();
            stopCostTimer();
            stopCallsTimer();
            printCredit();
        }
    }
}
// ===================== USERS =====================
let users = [];
let user1 = new Smartphone('User 1', 0, 0);
users.push(user1);
function getUsers() {
    let section = document.querySelector('.users');
    users.forEach(ele => {
        let container = document.createElement('div');
        container.classList.add('container');
        section === null || section === void 0 ? void 0 : section.appendChild(container);
        let user = document.createElement('h2');
        user.innerHTML = `${ele.userName}`;
        container.appendChild(user);
        let phone = document.createElement('div');
        phone.classList.add('phone');
        user === null || user === void 0 ? void 0 : user.appendChild(phone);
        let display = document.createElement('p');
        display.innerHTML = '<span> ---- </span>';
        phone.appendChild(display);
        let btn404 = document.createElement('button');
        btn404.innerHTML = 'Call 404';
        phone.appendChild(btn404);
        let btnCloseCall = document.createElement('button');
        btnCloseCall.innerHTML = '<span class="iconify" data-icon="fluent:call-dismiss-16-filled"></span>';
        phone.appendChild(btnCloseCall);
        let btnCall = document.createElement('button');
        btnCall.innerHTML = '<span class="iconify" data-icon="fluent:call-connecting-20-filled"></span>';
        phone.appendChild(btnCall);
        let userInfo = document.createElement('div');
        userInfo.classList.add('userInfo');
        user.appendChild(userInfo);
        let credit = document.createElement('p');
        credit.innerHTML = `Credit: <span>0 £</span>`;
        userInfo.appendChild(credit);
        let callNum = document.createElement('p');
        callNum.innerHTML = `Numero Chiamate: <span> 0 </span>`;
        userInfo.appendChild(callNum);
        let callTot = document.createElement('p');
        callTot.innerHTML = `Durata Chiamate: <span> 00 : 00 : 00 </span>`;
        userInfo.appendChild(callTot);
        let btnDelete = document.createElement('button');
        btnDelete.innerHTML = '<span class="iconify" data-icon="ri:delete-bin-6-fill"></span> Cancella chiamate';
        userInfo.appendChild(btnDelete);
        let topUp = document.createElement('div');
        topUp.classList.add('topUp');
        topUp.innerHTML = `<input type="number" name="topup" placeholder="Importo">`;
        user.appendChild(topUp);
        let btnTopUp = document.createElement('button');
        btnTopUp.innerHTML = 'Top-up';
        topUp.appendChild(btnTopUp);
    });
}
// ===================== PHONE FUNCTIONS =====================
document.addEventListener('DOMContentLoaded', () => {
    getUsers();
    let topUpBtn = document.querySelector('.topUp button');
    if (topUpBtn !== null) {
        topUpBtn.addEventListener('click', topUp);
    }
    let callBtn = document.querySelector('.phone button:last-child');
    if (callBtn !== null) {
        callBtn.addEventListener('click', newCall);
    }
    let stopCallBtn = document.querySelector('.phone button:nth-child(3)');
    if (stopCallBtn !== null) {
        stopCallBtn.addEventListener('click', endCall);
    }
    let btn404 = document.querySelector('.phone p + button');
    if (btn404 !== null) {
        btn404.addEventListener('click', call404);
    }
    let btnBin = document.querySelector('.userInfo button:last-child');
    if (btnBin !== null) {
        btnBin.addEventListener('click', deleteCalls);
    }
});
function topUp() {
    let topUpInput = document.querySelector('.topUp input');
    if (topUpInput !== null && topUpInput.value.trim() !== '') {
        let topUpAmount = topUpInput.value;
        users.forEach(element => {
            element.ricarica(+topUpAmount);
            let credit = document.querySelector('.userInfo p:first-child span');
            if (credit !== null) {
                credit.innerHTML = `${element.carica.toFixed(2)} £`;
            }
        });
    }
    topUpInput.value = '';
}
function newCall() {
    users.forEach(element => {
        if (element.carica > 0.20 && callDuration === undefined) {
            users.forEach(element => {
                element.chiamata();
                startTimer();
                startCallsTimer();
                startCall();
                costTimer();
            });
        }
        else if (element.carica <= 0.50) {
            alert('Credito insufficiente, fai un top-up!');
        }
        let callNum = document.querySelector('.userInfo p:nth-child(2) span');
        if (callNum !== null) {
            callNum.innerHTML = `${element.numeroChiamate}`;
        }
    });
}
function startCall() {
    const scatto = 0.50;
    users.forEach(element => {
        element.carica = element.carica - scatto;
    });
    printCredit();
}
function endCall() {
    resetTimer();
    stopCostTimer();
    stopCallsTimer();
    printCredit();
}
function call404() {
    users.forEach(element => {
        let displayCredit = document.querySelector('.phone p span');
        if (displayCredit !== null) {
            displayCredit.innerHTML = `${element.carica.toFixed(2)} £`;
        }
    });
}
function deleteCalls() {
    let resetCalls = document.querySelector('.userInfo p:nth-child(2) span');
    if (resetCalls !== null) {
        resetCalls.innerHTML = `0`;
    }
    let callTimer = document.querySelector('.userInfo p:nth-child(3) span');
    if (callTimer !== null) {
        callTimer.innerHTML = '00 : 00 : 00';
    }
}
// ===================== CALL DURATION =====================
let callDuration;
let hours = 0;
let mins = 0;
let secs = 0;
function setTimer() {
    secs++;
    if (secs >= 60) {
        secs = 0;
        mins++;
    }
    if (mins >= 60) {
        mins = 0;
        hours++;
    }
    printCallDuration();
}
function startTimer() {
    if (callDuration === undefined) {
        callDuration = setInterval(setTimer, 1000);
    }
}
function printCallDuration() {
    users.forEach(element => {
        let callTimer = document.querySelector('.phone p span');
        if (callTimer !== null) {
            callTimer.innerHTML = (hours > 9 ? hours : '0' + hours) + (' : ')
                + (mins > 9 ? mins : '0' + mins) + (' : ')
                + (secs > 9 ? secs : '0' + secs);
        }
    });
}
function resetTimer() {
    clearInterval(callDuration);
    callDuration = undefined;
    hours = 0;
    mins = 0;
    secs = 0;
    printCallDuration();
}
// ===================== CALLS TIMER =====================
let callsInterval;
let hoursInt = 0;
let minsInt = 0;
let secsInt = 0;
function setCallsTimer() {
    secsInt++;
    if (secsInt >= 60) {
        secsInt = 0;
        minsInt++;
    }
    if (minsInt >= 60) {
        minsInt = 0;
        hoursInt++;
    }
    printTimer();
}
function startCallsTimer() {
    callsInterval = setInterval(setCallsTimer, 1000);
}
function printTimer() {
    users.forEach(element => {
        let timer = document.querySelector('.userInfo p:nth-child(3) span');
        if (timer !== null) {
            timer.innerHTML = (hoursInt > 9 ? hoursInt : '0' + hoursInt) + (' : ')
                + (minsInt > 9 ? minsInt : '0' + minsInt) + (' : ')
                + (secsInt > 9 ? secsInt : '0' + secsInt);
        }
    });
}
function stopCallsTimer() {
    clearInterval(callsInterval);
}
// ===================== COST TIMER =====================
let callCredit;
function callCost() {
    let cost = 0.20;
    users.forEach(element => {
        element.durataChiamata(cost);
        printCredit();
    });
}
function printCredit() {
    users.forEach(element => {
        let updateCredit = document.querySelector('.userInfo p:first-child span');
        if (updateCredit !== null) {
            updateCredit.innerHTML = `${element.carica.toFixed(2)} £`;
        }
    });
}
function costTimer() {
    callCredit = setInterval(callCost, 60000);
}
function stopCostTimer() {
    clearInterval(callCredit);
}
