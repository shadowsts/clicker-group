
function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
let coinclick = document.getElementById('coinclick')
let coins = 0
let coinlabel = document.getElementById("coinhave")
let coinperclick = 1
let coinmultiplier1 = 1
let coinpersecond = 1
let multipliercoinperclick = 1
coinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет`;
document.getElementById('open-upgrades').addEventListener('click', () => {
  document.getElementById('upgrade-menu').classList.remove('hidden');
});

document.getElementById('close-upgrades').addEventListener('click', () => {
  document.getElementById('upgrade-menu').classList.add('hidden');
});
coinclick.addEventListener("click",function () {
    coins += (coinperclick * coinmultiplier1);
    coinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет`;
    coinclick.style.width = "270px"
    coinclick.style.height = "270px"
     anime({
        targets: coinclick,
        duration: 100,
        easing: "linear",
        width: 250,
        height: 250,
        rotate: randint(-30,30),
       })
       coinlabel.style.backgroundColor = "#fff4c8"
       anime({
        targets: coinlabel,
        backgroundColor: "#f9e287",
        duration: 1000,
       })
});
setInterval(function() {
  if (coinpersecond >= 1){
  coins += (coinpersecond * multipliercoinperclick);
  coinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет`;
  coinlabel.style.backgroundColor = "#fff4c8"
       anime({
        targets: coinlabel,
        backgroundColor: "#f9e287",
        duration: 1000,
       })}
}, 1000);
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const upgradeItem = button.closest('.upgrade-item');
    const priceDiv = upgradeItem.querySelector('.upgrade-price');

    let cost = parseFloat(button.dataset.cost);
    const multiplier = parseFloat(button.dataset.multiplier);
    let bonus = parseFloat(button.dataset.bonus)
    let type = button.dataset.upgradetype

    if (coins >= cost){
      if (type == "multcoin"){
        coins -= cost
        coinmultiplier1 += bonus
      }else if(type == "click"){
        coins -= cost
      coinperclick += bonus
      }else if(type == "cps"){
        coins -= cost
      coinpersecond += bonus
      }else if(type == "multcps"){
        coins -= cost
      multipliercoinperclick += bonus
      }
      upgradeItem.style.backgroundColor = "#faf5e4"
       anime({
        targets: upgradeItem,
        backgroundColor: "#ffe696",
        duration: 3000,
       })
    cost = Math.floor(cost * multiplier);

    button.dataset.cost = cost;

    priceDiv.textContent = `ціна: ${cost}`;
    coinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет`;
    }
  });
});