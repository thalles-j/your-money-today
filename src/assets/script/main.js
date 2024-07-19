import { renderChart } from './grafico.js';

document.addEventListener('DOMContentLoaded', function() {
    const seletorMoeda = document.getElementById("coin");
    const inputValor = document.getElementById("valor");
    const result = document.getElementById("result");
    const selectSpan = document.getElementById("selectSpan");

    const fetchExchangeRates = async () => {
        try {
            const response = await fetch('/exchange-rates'); // Endpoint para buscar taxas de câmbio
            const rates = await response.json();
            console.log('Taxas de câmbio:', rates); // Debugging log
            return rates;
        } catch (error) {
            console.error('Erro ao buscar as taxas de câmbio:', error);
            alert('Erro ao buscar as taxas de câmbio. Tente novamente mais tarde.');
            return null;
        }
    };

    const updateConversion = (currency, rate) => {
        const valor = parseFloat(inputValor.value);
        if (!isNaN(valor) && rate) {
            const conversion = valor * rate;
            result.value = conversion.toFixed(2);
        } else {
            result.value = '';
        }
    };

    seletorMoeda.addEventListener('change', async function() {
        const currency = seletorMoeda.value;
        const rates = await fetchExchangeRates();
        if (rates) {
            selectSpan.textContent = currency.toUpperCase();
            const rate = rates[currency];
            updateConversion(currency, rate);
            const data = [rate, rate]; // Usando o mesmo valor para compra e venda como exemplo
            console.log('Renderizando gráfico com dados:', { currency, data }); // Debugging log
            renderChart(currency, data);
        }
    });

    document.getElementById("convertButton").addEventListener('click', async function() {
        const currency = seletorMoeda.value;
        const rates = await fetchExchangeRates();
        if (rates) {
            const rate = rates[currency];
            updateConversion(currency, rate);
        }
    });

    // Inicializa com a moeda padrão
    seletorMoeda.dispatchEvent(new Event('change'));
});


