const button = document.querySelector(".submit-button"),
resultText = document.querySelector(".result-text");
let baseCurrency = document.querySelector(".form-select-one"),
targetCurrency = document.querySelector(".form-select-two");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";
const BTC_URL = "https://blockchain.info/ticker";

button.addEventListener("click", e => {
    let amount = document.querySelector("#amount_one").value;
    let selectedBaseCurrency = baseCurrency.value;
    let selectedTargetCurrency = targetCurrency.value;
    let result = 0;

    if (selectedBaseCurrency == selectedTargetCurrency) {
        resultText.innerText = "Please select different currencies";
        return;
    }

    e.preventDefault();
    if (selectedBaseCurrency == "BTC") {
        fetch(BTC_URL).then(response => response.json()).then(data => {
            let exchangeRate = data.USD.last;
            let exchangeResultUSD = (amount * exchangeRate).toFixed(2);
            let url = 'https://api.exchangerate-api.com/v4/latest/USD';
            fetch(url).then(response => response.json()).then(data => {
                let exchangeRate = data.rates[selectedTargetCurrency];
                let exchangeResult = (exchangeResultUSD * exchangeRate).toFixed(2);
                resultText.innerText = amount + " " + selectedBaseCurrency + " = " + exchangeResult + " " + selectedTargetCurrency;
            })
        })
    } else if (selectedTargetCurrency == "BTC") {
        fetch(BTC_URL).then(response => response.json()).then(data => {
            let exchangeRate = data.USD.last;
            let exchangeResultUSD = (amount / exchangeRate).toFixed(8);
            let url = 'https://api.exchangerate-api.com/v4/latest/USD';
            fetch(url).then(response => response.json()).then(data => {
                let exchangeRate = data.rates[selectedBaseCurrency];
                let exchangeResult = (exchangeResultUSD / exchangeRate).toFixed(8);
                resultText.innerText = amount + " " + selectedBaseCurrency + " = " + exchangeResult + " " + selectedTargetCurrency;
            })
        })
    } else {
        getExchangeRate(amount, selectedBaseCurrency, selectedTargetCurrency);
    }
});

function getExchangeRate(amount, selectedBaseCurrency, selectedTargetCurrency) {
    let url = 'https://api.exchangerate-api.com/v4/latest/' + selectedBaseCurrency;
    fetch(url).then(response => response.json()).then(data => {
        let exchangeRate = data.rates[selectedTargetCurrency];
        let exchangeResult = (amount * exchangeRate).toFixed(2);
        resultText.innerText = amount + " " + selectedBaseCurrency + " = " + exchangeResult + " " + selectedTargetCurrency;
    })
}