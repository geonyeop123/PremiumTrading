"use strict";
const upbitValue = document.querySelector("#upbitValue");
const binanceValue = document.querySelector("#binanceValue");
const totalValue = document.querySelector("#totalValue");
const exchangeValue = document.querySelector("#exchangeValue");
const upbitPriceTitle = document.querySelector("#upbitPrice");
const binancePriceTitle = document.querySelector("#binancePrice");
const upbitInput = document.querySelector("#upbitInput");
const binanceInput = document.querySelector("#binanceInput");
const sellUpbitInput = document.querySelector("#sellUpbitInput");
const sellBinanceInput = document.querySelector("#sellBinanceInput");
const dregsUpbitInput = document.querySelector("#upbitDregsInput");
const dregsBinanceInput = document.querySelector("#binanceDregsInput");
const binanceTimerTitle = document.querySelector(".binanceTimer");
const upbitTimerTitle = document.querySelector(".upbitTimer");
const benefitValue = document.querySelector("#benefitValue");
const coinSelectInput = document.querySelector(".coinChoice");
const leverageSelectInput = document.querySelector(".leverageChoice");
const upbitBenefitPTag = document.querySelector(".upbitBenefit");
const binanceBenefitPTag = document.querySelector(".binanceBenefit");
const binanceBenefitKRWPTag = document.querySelector(".binanceBenefitKRW");
const premiumValue = document.querySelector(".premium_value");
const benefitPremiumValue = document.querySelector(".benefitPremium_value");

const upbitValueSession = "upbitValue";
const binanceValueSession = "binanceValue";
const upbitCoinSession = "upbitCoin";
const binanceCoinSession = "binanceCoin";
const upbitDregsSession = "upbitDregs";
const binanceDregsSession = "binanceDregs";
const exchangeSession = "exchange";
const sellUpbitSession = "sellUpbit";
const sellBinanceSession = "sellBinance";
const selectCoinSession = "selectCoin";
const leverageSession = "leverage";

let upbit = 0;
let binance = 0;
let exchange = 0;
let upbitCoin = 0;
let binanceCoin = 0;
let upbitDregs = 0;
let binanceDregs = 0;
let sellUpbit = 0;
let sellBinance = 0;
let leverage = 2;
let myUpbit = 0;
let myBinance = 0;
let mySellUpbit = 0;
let mySellBinance = 0;
let selectCoin = "BTC";

let upbitBenefit = 0;
let binanceBenefit = 0;
let benefit = 0;
let timer = 5;

let sellPremium = 0;
let premium = 0;
let symbol = "";

let upbitURL = "";
let binanceURL = "";

function parsingInput() {
  upbitCoin = parseFloat(upbitInput.value);
  localStorage.setItem(upbitCoinSession, upbitCoin);
  binanceCoin = parseFloat(binanceInput.value);
  localStorage.setItem(binanceCoinSession, binanceCoin);
  upbitDregs = parseInt(dregsUpbitInput.value);
  localStorage.setItem(upbitDregsSession, upbitDregs);
  binanceDregs = parseFloat(dregsBinanceInput.value);
  localStorage.setItem(binanceDregsSession, binanceDregs);
  sellUpbit = parseFloat(sellUpbitInput.value);
  localStorage.setItem(sellUpbitSession, sellUpbit);
  sellBinance = parseFloat(sellBinanceInput.value);
  localStorage.setItem(sellBinanceSession, sellBinance);
  selectCoin = coinSelectInput.value;
  localStorage.setItem(selectCoinSession, selectCoin);
  leverage = leverageSelectInput.value;
  localStorage.setItem(leverageSession, leverage);
}
function calcPrice() {
  myUpbit = Math.round(upbitCoin * upbit);
  myBinance = binanceCoin * binance * exchange;
  mySellUpbit = upbitCoin * sellUpbit;
  mySellBinance = binanceCoin * sellBinance * exchange;
  upbitBenefit = myUpbit - mySellUpbit;
  binanceBenefit = mySellBinance - myBinance;
  benefit = Math.round(upbitBenefit + binanceBenefit);
  // binanceBenefit =
}
function showPrice() {
  let calcUpbit = mySellUpbit + upbitBenefit + upbitDregs;
  let calcBinance = Math.round(
    mySellBinance / leverage + binanceDregs * exchange + binanceBenefit
  );
  upbitPriceTitle.textContent = upbit.toLocaleString();
  binancePriceTitle.textContent = binance.toLocaleString();
  upbitValue.textContent = calcUpbit.toLocaleString() + "₩";
  binanceValue.textContent = calcBinance.toLocaleString() + "₩";
  totalValue.textContent = (calcUpbit + calcBinance).toLocaleString() + "₩";
  symbol = benefit < 0 ? "" : "+";
  benefitValue.textContent = symbol + benefit.toLocaleString() + "₩";
  benefitValue.style.color = minusCheck(benefit) ? "red" : "green";
  upbitBenefitPTag.style.color = minusCheck(upbitBenefit) ? "red" : "green";
  binanceBenefitPTag.style.color = minusCheck(binanceBenefit) ? "red" : "green";
  binanceBenefitKRWPTag.style.color = minusCheck(binanceBenefit)
    ? "red"
    : "green";
  benefitPremiumValue.style.color = minusCheck(benefit) ? "red" : "green";
  upbitBenefitPTag.textContent = minusCheck(upbitBenefit)
    ? Math.round(upbitBenefit).toLocaleString() + "₩"
    : "+" + Math.round(upbitBenefit).toLocaleString() + "₩";
  binanceBenefitPTag.textContent = minusCheck(binanceBenefit)
    ? "[" + (binanceBenefit / exchange).toFixed(2) + "$" + "]"
    : "[" + "+" + (binanceBenefit / exchange).toFixed(2) + "$" + "]";
  binanceBenefitKRWPTag.textContent = minusCheck(binanceBenefit)
    ? Math.round(binanceBenefit).toLocaleString() + "₩"
    : "+" + Math.round(binanceBenefit).toLocaleString() + "₩";
  premium = (((upbit - binance * exchange) / upbit) * 100).toFixed(2);
  sellPremium = (parseFloat(premium) - (benefit / myUpbit) * 100).toFixed(2);
  premiumValue.textContent = premium + "　　 " + sellPremium;
  benefitPremiumValue.textContent =
    "(" + symbol + (premium - sellPremium).toFixed(2) + ")";
  timer = 5;
  document.title =
    premium +
    " " +
    symbol +
    benefit.toLocaleString() +
    " " +
    timer +
    " " +
    sellPremium;
}
function getExchange() {
  fetch("https://exchange.jaeheon.kr:23490/query/USDKRW")
    .then((response) => response.json())
    .then((data) => {
      exchange = data.USDKRW[0];
      localStorage.setItem(exchangeSession, exchange);
      exchangeValue.textContent = exchange;
    });
}
function minusCheck(int) {
  return int < 0 ? true : false;
}
function getFloat(value) {
  if (value == NaN || value == null) return 0;
  return parseFloat(value);
}
function getInt(value) {
  if (value == NaN || value == null) return 0;
  return parseInt(value);
}
function getPrice() {
  fetch(binanceURL)
    .then((response) => response.json())
    .then((data) => {
      binance = data.price;
      localStorage.setItem(binanceValueSession, binance);
      fetch(upbitURL)
        .then((response) => response.json())
        .then((data) => {
          upbit = data[0].trade_price;
          localStorage.setItem(upbitValueSession, upbit);
          parsingInput();
          calcPrice();
          showPrice();
        });
    });
}

function init() {
  upbitInput.value = getFloat(localStorage.getItem(upbitCoinSession));
  binanceInput.value = getFloat(localStorage.getItem(binanceCoinSession));
  dregsUpbitInput.value = getInt(localStorage.getItem(upbitDregsSession));
  dregsBinanceInput.value = getFloat(localStorage.getItem(binanceDregsSession));
  sellBinanceInput.value = getFloat(localStorage.getItem(sellBinanceSession));
  sellUpbitInput.value = getFloat(localStorage.getItem(sellUpbitSession));
  coinSelectInput.value =
    localStorage.getItem(selectCoinSession) != ""
      ? localStorage.getItem(selectCoinSession)
      : "BTC";
  leverageSelectInput.value =
    localStorage.getItem(leverageSession) != ""
      ? parseInt(localStorage.getItem(leverageSession))
      : 2;
  exchange = getInt(localStorage.getItem(exchangeSession));
  binance = getFloat(localStorage.getItem(binanceValueSession));
  upbit = getInt(localStorage.getItem(upbitValueSession, upbit));
  settingCoin();
  getExchange();
  getPrice();
}
function getTimer() {
  timer--;
  upbitTimerTitle.textContent = timer;
  binanceTimerTitle.textContent = timer;
  document.title =
    premium +
    " " +
    symbol +
    benefit.toLocaleString() +
    " " +
    timer +
    " " +
    sellPremium;
}
function settingCoin() {
  selectCoin = coinSelectInput.value;
  console.log("setting ", selectCoin, leverage);
  leverage = leverageSelectInput.value;
  switch (selectCoin) {
    case "BTC":
      upbitURL = "https://api.upbit.com/v1/ticker?markets=KRW-BTC";
      binanceURL =
        "https://fapi.binance.com//fapi/v1/ticker/price?symbol=BTCUSDT";
      break;
    case "XRP":
      upbitURL = "https://api.upbit.com/v1/ticker?markets=KRW-XRP";
      binanceURL =
        "https://fapi.binance.com//fapi/v1/ticker/price?symbol=XRPUSDT";
      break;
    case "ETH":
      upbitURL = "https://api.upbit.com/v1/ticker?markets=KRW-ETH";
      binanceURL =
        "https://fapi.binance.com//fapi/v1/ticker/price?symbol=ETHUSDT";
      break;
    default:
      upbitURL = "https://api.upbit.com/v1/ticker?markets=KRW-BTC";
      binanceURL =
        "https://fapi.binance.com//fapi/v1/ticker/price?symbol=BTCUSDT";
      break;
  }
}
setInterval(getPrice, 5000);
setInterval(getTimer, 1000);
setInterval(getExchange, 30000);
init();
