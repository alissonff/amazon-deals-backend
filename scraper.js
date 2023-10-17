const puppeteer = require('puppeteer');

async function scrapeDepartment(department) {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();

    // Navigate to the Amazon.ca department deals page
    await page.goto(`url`);

    // Add scraping logic for the department here if needed

    await browser.close();
    // Return the scraped data for the department here
}

async function scrapeProduct(url) {
    console.log("Scraping function called3");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto(url);

    //await page.waitForSelector('.a-price-whole', 'a-price a-text-price header-price a-size-base a-text-normal');
    const priceSelectors = ['.a-price-whole', 'a-price a-text-price header-price a-size-base a-text-normal'];
    const founSelector = await waitForMultipleSelectors(page, priceSelectors);

    console.log("Scraping function called");

    const productDetails = await page.evaluate((founSelector) => {
        console.log("Scraping function called2");
        let title = document.getElementById('productTitle')?.textContent?.trim();

        

        let priceWholeElement = document.getElementsByClassName('a-price-whole');
        let priceFractionElement = document.getElementsByClassName('a-price-fraction');
        
        
        let priceWhole = priceWholeElement.length > 0 ? priceWholeElement[0].textContent.trim() : null;
        let priceFraction = priceFractionElement.length > 0 ? priceFractionElement[0].textContent.trim() : null;
        let priceOneTime = priceOneTimeElement.length > 0 ? priceOneTimeElement[0].textContent.trim() : null;
        
        // Combine the whole and fraction parts of the price
        let price = priceWhole && priceFraction ? `${priceWhole}${priceFraction}` : priceWhole;
    
        let rating = document.querySelector('.a-icon-alt')?.textContent?.trim();
        let numberOfReviews = document.getElementById('acrCustomerReviewText')?.textContent?.trim();
    
        return {
            title,
            price,
            priceOneTime,
            rating,
            numberOfReviews
        };
    });

    await browser.close();
    return productDetails;
}

module.exports = {
    scrapeDepartment,
    scrapeProduct
};