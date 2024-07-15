const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.EXCHANGE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Servir arquivos estáticos da pasta 'src'
app.use(express.static(path.join(__dirname, '..', 'src')));

// Endpoint para obter as taxas de câmbio
app.get('/exchange-rates', async (req, res) => {
    try {
        const currencies = ['USD', 'EUR', 'ARS', 'AOA'];
        const requests = currencies.map(currency => axios.get(`${BASE_URL}/${API_KEY}/latest/${currency}`));
        const responses = await Promise.all(requests);
        
        const exchangeRates = responses.reduce((acc, response) => {
            const currency = response.data.base_code;
            acc[currency] = response.data.conversion_rates.BRL;
            return acc;
        }, {});

        res.json(exchangeRates);
    } catch (error) {
        console.error('Erro ao buscar as taxas de câmbio:', error);
        res.status(500).json({ error: 'Erro ao buscar as taxas de câmbio' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
