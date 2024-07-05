const express = require('express');
const router = express.Router();
const { scrapeMedium } = require('../scraper/mediumScraper');

let cachedArticles = [];

router.post('/scrape', async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    try {
        cachedArticles = await scrapeMedium(topic);
        res.json({ message: 'Scraping successful', articles: cachedArticles });
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape articles' });
    }
});

router.get('/articles', (req, res) => {
    res.json(cachedArticles);
});

module.exports = router;
