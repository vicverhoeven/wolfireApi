const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS middleware
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

const apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6IjJhMWQ5YzMwNTM4YmQxYzc4YzVlODBiZDE3YjA2MThiZmRjMzRmZDI1OWUxZWUxZTM1OThmMTYzMzNhMjRmMzc4NzdmMzBkNWU2YTg2OGRkIiwiaWF0IjoxNzM4ODUxMzQxLjYwMjA1OCwibmJmIjoxNzM4ODUxMzQxLjYwMjA2LCJleHAiOjE3NzAzODczNDEuNTk0NTk3LCJzdWIiOiIxODExNjIxOCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiLCJ1c2VyLmluZm8iXX0.Am3NLYHklEDoh0hp7Tp6tYfRS8kQC4_kQsOjwbLJGWT0Q-XiZOcLRjdaVCgdV5H3ucic3pkxDXuXydrecMQ';
const shopId = '15805855';

// Serve static files
app.use(express.static('public'));

app.get('/api/product/:productId', async (req, res) => {
    const { productId } = req.params;
    console.log(`Ontvangen verzoek voor product met ID: ${productId}`);
    try {
        const response = await axios.get(`https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        });
        console.log('Response data:', response.data); // Log response data
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching product data:', error); // Log error
        res.status(500).send('Fout bij het ophalen van productgegevens');
    }
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
