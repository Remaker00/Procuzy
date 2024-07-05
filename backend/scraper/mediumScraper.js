const puppeteer = require('puppeteer');

async function scrapeMedium(topic) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    page.on('console', msg => {
        const text = msg.text();
        console.log('MY LOG:', text);
    });

    const searchUrl = `https://medium.com/search?q=${encodeURIComponent(topic)}`;
    console.log('Search URL:', searchUrl);
    await page.goto(searchUrl);

    const articles = await page.evaluate(() => {
        const articleNodes = document.querySelectorAll('div.co article');
        console.log('Article nodes found:', articleNodes.length);

        const articleData = [];
        articleNodes.forEach(node => {
            const titleElement = node.querySelector('.be.kl.mi');
            const authorElement = node.querySelector('.be.b.ik.z.ee.hl.ef.eg.eh.ei.eg.ek.bj');
            const pubdateElement = node.querySelector('.ab.q span');
            const dataHrefElement = node.querySelector("[data-href]");

            // Check if elements are found before accessing textContent or attributes
            const title = titleElement ? titleElement.textContent.trim() : 'No title found';
            const author = authorElement ? authorElement.textContent.trim() : 'No author found';
            const pubdate = pubdateElement ? pubdateElement.textContent.trim() : 'No published date found';
            const url = dataHrefElement ? dataHrefElement.getAttribute('data-href') : 'No url found';

            console.log('Title:', title);
            console.log('Author:', author);
            console.log('Published Date:', pubdate);
            console.log('URL:', url);

            articleData.push({ title, author, pubdate, url });
        });

        return articleData.slice(0, 5); // Limiting to first 5 articles
    });

    await browser.close();
    console.log('<><><><', articles);
    return articles;
}

module.exports = { scrapeMedium };
