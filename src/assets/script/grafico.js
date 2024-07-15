document.addEventListener('DOMContentLoaded', async function() {
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
                type: 'line',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: `Variação da Taxa de Câmbio (${currency.toUpperCase()})`,
                        data: Object.values(data),
                        fill: false,
                        borderColor: '#007bff',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Tempo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Taxa de Câmbio'
                            },
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    };

    const rates = await fetchExchangeRates();
    if (rates) {
        const defaultCurrency = 'USD'; // Moeda padrão para inicialização
        renderChart(defaultCurrency, rates[defaultCurrency]);
    }
});
