
function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function calculateRebirthCoins(gameCoins, totalRebirths) {
  const baseCost = 100000;
  const scale = 5;
  const multiplier = Math.pow(1.25, totalRebirths);

  let rbcoinstogive = 0;
  let currentCost = baseCost * multiplier;

  while (gameCoins >= currentCost) {
    rbcoinstogive += 1;
    currentCost *= scale;
  }
  gameCoins -= currentCost;

  return {
    rbcoinstogive
  };
}
let rebirthbutton = document.getElementById("rebirth-button")
let Rebirths = 0
let RebirthCoins = 0
let openrebupgrades = document.getElementById("open-rebupgrades")
let coinclick = document.getElementById('coinclick')
let coins = 100000
let coinlabel = document.getElementById("coinhave")
let rebirthcoinlabel = document.getElementById("rebirthcoinhave")
let coinperclick = 1
let coinmultiplier1 = 1
let coinpersecond = 0
let multipliercoinperclick = 1
let percentcoin = 0
let coinRebirthMulti = 1
let container = document.getElementById("clonething")
let RebirthCpsMulti = 1
coinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет`;
document.getElementById('open-upgrades').addEventListener('click', () => {
  document.getElementById('upgrade-menu').classList.remove('hidden'); // upgradesopn
});

document.getElementById('close-upgrades').addEventListener('click', () => {
  document.getElementById('upgrade-menu').classList.add('hidden'); //upgradeclose
});
document.getElementById('open-rebupgrades').addEventListener('click', () => {
  document.getElementById('rbupgrade-menu').classList.remove('hidden'); // rebirth upgrade
});

document.getElementById('rbclose-upgrades').addEventListener('click', () => {
  document.getElementById('rbupgrade-menu').classList.add('hidden'); //rebirth upgrade
});


document.getElementById('open-rebirth').addEventListener('click', () => {
  document.getElementById('rebirth-menu').classList.remove('hidden'); // rebirth
  document.getElementById('getrebirthcoins-text').textContent = `при переродженні зараз ти отримаеш:${calculateRebirthCoins(coins, Rebirths).rbcoinstogive} монет переродження`
});

document.getElementById('close-rebirth').addEventListener('click', () => {
  document.getElementById('rebirth-menu').classList.add('hidden'); //rebirth
});
coinclick.addEventListener("click",function () {
    coins += (coinperclick * coinmultiplier1 * 1.25**percentcoin * coinRebirthMulti); // coin click
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
       // aaaaaaaaaaaaaaaaaa clone thingy aaaaaaaaaaaaaa
       const newcoinclone = document.createElement('button');
      newcoinclone.classList.add('coinclone');
      newcoinclone.style.top = "-30px"
      newcoinclone.style.left = `${randint(10,90)}%`;
      container.appendChild(newcoinclone);
        anime({
          targets: newcoinclone,
          translateY: 350,     
          opacity: 0,          
          duration: 1500,   
          rotate: randint(-100,100),   
          easing: 'easeInOutQuad',
          complete: () => {
            newcoinclone.remove();
          }
        });
});
setInterval(function() {
  if (coinpersecond >= 1){
  coins += (coinpersecond * multipliercoinperclick * RebirthCpsMulti);
  coinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет`;
  coinlabel.style.backgroundColor = "#fff4c8"
       anime({
        targets: coinlabel,
        backgroundColor: "#f9e287",
        duration: 1000,
       })}
}, 1000);
const buyButtons = document.querySelectorAll('.buy-btn');
// пркоачки
buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const upgradeItem = button.closest('.upgrade-item'); // прокачки 
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
      }else if(type == "percentcoin"){
        coins -= cost
      percentcoin += bonus
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
// прокачки переродження
const RebirthbuyButtons = document.querySelectorAll('.rbbuy-btn');
RebirthbuyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const upgradeItem = button.closest('.rbupgrade-item');
    const priceDiv = upgradeItem.querySelector('.upgrade-price');

    let cost = parseFloat(button.dataset.cost);
    const multiplier = parseFloat(button.dataset.multiplier);
    let bonus = parseFloat(button.dataset.bonus)
    let type = button.dataset.upgradetype

    if (RebirthCoins >= cost){
      if (type == "mult"){
        RebirthCoins -= cost
        coinRebirthMulti += bonus
      } else if (type == "multcps"){
        RebirthCoins -= cost
        RebirthCpsMulti += bonus
      }
      upgradeItem.style.backgroundColor = "#ffffff"
       anime({
        targets: upgradeItem,
        backgroundColor: "#f27cff",
        duration: 3000,
       })
    cost = Math.floor(cost * multiplier);

    button.dataset.cost = cost;

    priceDiv.textContent = `ціна: ${cost} мп`;
    rebirthcoinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет переродження`;
    }
  });
});
//зробити переродження
rebirthbutton.addEventListener("click",function () {
const result = calculateRebirthCoins(coins, Rebirths);
if (result.rbcoinstogive >= 1 ) {
  if (RebirthCoins == 0){
    rebirthcoinlabel.classList.remove("hidden")
    openrebupgrades.classList.remove("hidden")
  }
RebirthCoins += result.rbcoinstogive
coins = 0
coinperclick = 1
coinmultiplier1 = 1
coinpersecond = 0
multipliercoinperclick = 1
percentcoin = 0
Rebirths += 1
buyButtons.forEach(button => {
  const upgradeItem = button.closest('.upgrade-item');
    const priceDiv = upgradeItem.querySelector('.upgrade-price');

    let cost = parseFloat(button.dataset.cost);
    let basiccost = parseFloat(button.dataset.basiccost)
    cost = basiccost

    button.dataset.cost = basiccost;

    priceDiv.textContent = `ціна: ${cost}`;})
    coinlabel.textContent = `в тебе є  ${Math.floor(coins)}  монет`;
    rebirthcoinlabel.textContent = `в тебе є  ${Math.floor(RebirthCoins)}  монет переродження`;
    document.getElementById("splash").classList.remove("hidden")
    rebirthbutton.textContent = `зробити переродження: ${Math.floor(100000 * Math.pow(1.25,Rebirths))}`
    document.getElementById('getrebirthcoins-text').textContent = `при переродженні зараз ти отримаеш:${calculateRebirthCoins(coins, Rebirths).rbcoinstogive} монет переродження`
    anime({
      targets: document.getElementById("splash"),     
      opacity: 1,          
      duration: 1000, 
      easing: 'easeInOutQuad',     
      complete: () => {
        anime({
      targets: document.getElementById("splash"),     
      opacity: 0,          
      duration: 3000,
      easing: 'easeInOutQuad',
      complete: () => {document.getElementById("splash").classList.add("hidden")}})
      }
}
 )}
})