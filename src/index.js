"use strict";
const upbitValue = document.querySelector("#upbitValue");
const binanceValue = document.querySelector("#binanceValue");
const totalValue = document.querySelector("#totalValue");
const exchangeValue = document.querySelector("#exchangeValue");
const usdtValue = document.querySelector("#usdtValue");
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
const exchangeSelectInput = document.querySelector(".exchangeChoice");
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
const selectExchangeSession = "selectExchange";
const leverageSession = "leverage";
const usdtSession = "usdtSession";

let upbit = 0;
let upbitUsdt = 0;
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
let usdt = 0;
let selectCoin = "BTC";
let selectExchange = "BITHUMB";
let benefitPremiumValueText = "";

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
  selectExchange = exchangeSelectInput.value;
  localStorage.setItem(selectExchangeSession, selectExchange);
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
}
function showPrice() {
  let calcUpbit = mySellUpbit + upbitBenefit + upbitDregs;
  let calcBinance = Math.round(
    mySellBinance / leverage + binanceDregs * exchange + binanceBenefit
  );
  upbitPriceTitle.textContent = upbit.toLocaleString();
  binancePriceTitle.textContent = (
    Math.round(binance * 100) / 100
  ).toLocaleString("ko-KR", {
    maximumFractionDigits: 5,
  });
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
  benefitPremiumValueText = symbol + (premium - sellPremium).toFixed(2);
  premiumValue.textContent = premium + "　　 " + sellPremium;
  benefitPremiumValue.textContent = "(" + benefitPremiumValueText + ")";
  timer = 5;
  setTitle();
}
function getExchange() {
  fetch(
    "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1"
  )
    .then((response) => response.json())
    .then((data) => {
      exchange = data.country[1].value.replace(",", "");
      localStorage.setItem(exchangeSession, exchange);
      let titleExchange = (Math.round(exchange * 100) / 100).toLocaleString(
        "ko-KR",
        {
          maximumFractionDigits: 5,
        }
      );
      let titleUsdt = usdt.toLocaleString();
      exchangeValue.textContent = titleExchange + "　" + titleUsdt;
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
          usdt = data[1].trade_price;
          localStorage.setItem(upbitValueSession, upbit);
          localStorage.setItem(usdtSession, usdt);
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
  exchangeSelectInput.value =
    localStorage.getItem(selectExchangeSession) != ""
      ? localStorage.getItem(selectExchangeSession)
      : "BITHUMB";
  leverageSelectInput.value =
    localStorage.getItem(leverageSession) != ""
      ? parseInt(localStorage.getItem(leverageSession))
      : 2;
  exchange = getFloat(localStorage.getItem(exchangeSession));
  usdt = getFloat(localStorage.getItem(usdtSession));
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
  setTitle();
}
function setTitle() {
  document.title =
    symbol +
    benefit.toLocaleString() +
    " | " +
    premium +
    " | " +
    benefitPremiumValueText +
    " | " +
    timer;
}
function settingCoin() {
  selectCoin = coinSelectInput.value;
  leverage = leverageSelectInput.value;
  selectExchange = exchangeSelectInput.value;
  console.log("setting ", selectExchange, selectCoin, leverage);
  let baseUrl =
    selectExchange == "UPBIT"
      ? "https://api.upbit.com/"
      : "https://api.bithumb.com/";

  if (selectCoin) {
    upbitURL = baseUrl + "v1/ticker?markets=KRW-" + selectCoin + ",KRW-USDT";
    binanceURL =
      "https://fapi.binance.com/fapi/v1/ticker/price?symbol=" +
      selectCoin +
      "USDT";
  } else {
    upbitURL = baseUrl + "v1/ticker?markets=KRW-BTC,KRW-USDT";
    binanceURL = "https://fapi.binance.com/fapi/v1/ticker/price?symbol=BTCUSDT";
  }
}
setInterval(getPrice, 5000);
setInterval(getTimer, 1000);
setInterval(getExchange, 5000);
init();
