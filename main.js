let button = document.querySelector(".button1")
let upgrade = document.querySelector(".upgrade1")
let cashlabel = document.querySelector(".cashlabel")
let costlabel = document.querySelector(".costlabel")
let cash = 0
let cashperclick = 1
let upgradecost = 25
button.addEventListener("click",function () {
    cash += cashperclick;
    cashlabel.textContent = "cash: " + cash;
});
upgrade.addEventListener("click",function () {
    if(cash >= upgradecost){
    cashperclick += 1;
cash -= upgradecost;
upgradecost = Math.floor(upgradecost * 1.5)
cashlabel.textContent = "cash: " + cash;
costlabel.textContent = "upgradecost: " + upgradecost;
upgrade.textContent = "upgrade " + upgradecost;}
});
