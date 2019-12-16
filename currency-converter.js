const axios = require('axios');
// let fromCurrencySelect = document.querySelector("#fstSelect");
// let toCurrencySelect = document.querySelector("#scndSelect");

const getExchengeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get('http://www.apilayer.net/api/live?access_key=94dc71cd6dd795ac8aa21da751c3471c&format=1');
        const rate = response.data.rates;
        const euro = 1 / rate[fromCurrency];
        const exchengeRate = euro + rate[toCurrency];
        return getExchengeRate; 
    } catch (error) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }    
}

const getCountries = async (toCurrency) => {
    try {
        const respons = await axios.get(`http://restcountries.eu/rest/v2/currency/${toCurrency}`);

        return response.data.map(country => country.name);
    } catch (error) {
        throw new Error(`Unable to ger countries that use ${toCurrency}`);
    }
    
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const countries = await getCountries(toCurrency);
    const exchengeRate = await getExchengeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchengeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spent these into following countries: ${countries}`;
}

convertCurrency("USE", "EUR", 10)
    .then((message) => {
        console.log(message);
    }).catch((error) => {
        console.log(error.message);
    })
