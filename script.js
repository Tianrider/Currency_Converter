const button = document.querySelector(".submit-button"),
resultText = document.querySelector(".result-text");
let baseCurrency = document.querySelector(".form-select-one"),
targetCurrency = document.querySelector(".form-select-two");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

button.addEventListener("click", e => {
    e.preventDefault();
    exchangeRate();
});

function exchangeRate() {
    let amount = document.querySelector("#amount_one").value;
    let selectedBaseCurrency = baseCurrency.value;
    let selectedTargetCurrency = targetCurrency.value;

    let url = 'https://api.exchangerate-api.com/v4/latest/' + selectedBaseCurrency;
    fetch(url).then(response => response.json()).then(data => {
        let exchangeRate = data.rates[selectedTargetCurrency];
        let exchangeResult = (amount * exchangeRate).toFixed(2);
        resultText.innerText = amount + " " + selectedBaseCurrency + " = " + exchangeResult + " " + selectedTargetCurrency;
        console.log(exchangeResult);
    })
}
