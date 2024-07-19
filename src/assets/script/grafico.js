export const renderChart = (currency, data) => {
    const graficoCanvas = document.getElementById("grafico");
    if (graficoCanvas && graficoCanvas.getContext('2d')) {
        new Chart(graficoCanvas, {
            type: 'bar',
            data: {
                labels: ['Compra', 'Venda'],
                datasets: [{
                    label: `Taxa de Câmbio (${currency.toUpperCase()})`,
                    data: data,
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
