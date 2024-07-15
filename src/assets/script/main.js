document.addEventListener('DOMContentLoaded', function() {
    const seletorMoeda = document.getElementById("coin");
    const inputValor = document.getElementById("valor");
    const result = document.getElementById("result");
    const selectSpan = document.getElementById("selectSpan");
    const graficoCanvas = document.getElementById("grafico");

    const fetchExchangeRates = async () => {
        try {
            const response = await fetch('/exchange-rates'); // Endpoint para buscar taxas de câmbio
            const rates = await response.json();
            return rates;
        } catch (error) {
            console.error('Erro ao buscar as taxas de câmbio:', error);
            alert('Erro ao buscar as taxas de câmbio. Tente novamente mais tarde.');
            return null;
        }
    };

    const renderChart = (currency, data) => {
        if (graficoCanvas.getContext('2d')) {
            new Chart(graficoCanvas, {
                type: 'bar',
                data: {
                    labels: ['Compra', 'Venda'],
                    datasets: [{
                        label: `Taxa de Câmbio (${currency.toUpperCase()})`,
                        data: data[currency],
                        backgroundColor: ['#007bff', '#28a745'],
                        borderColor: ['#007bff', '#28a745'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
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
            const data = {
                'USD': [rates['USD'], rates['USD']],
                'EUR': [rates['EUR'], rates['EUR']],
                'AOA': [rates['AOA'], rates['AOA']],
                'ARS': [rates['ARS'], rates['ARS']]
            };
            renderChart(currency, data);
            updateConversion(currency, rates[currency]);
        }
    });

    inputValor.addEventListener('input', () => {
        const currency = seletorMoeda.value;
        const rates = fetchExchangeRates();
        if (rates) {
            updateConversion(currency, rates[currency]);
        }
    });

    // Inicializa o gráfico com a moeda padrão
    seletorMoeda.dispatchEvent(new Event('change'));
});
