const express = require('express');
const { scrapeDepartment, scrapeProduct } = require('./scraper');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Amazon Deals Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/scrape-product', async (req, res) => {
    const url = req.query.url;
    const productDetails = await scrapeProduct(url);
    console.log(productDetails);  // Log the scraped data
    res.json(productDetails);
});