/* eslint-env node, jest */
/* global page */

describe('The Daily Lore', () => {
    beforeAll(() => {
        page.setDefaultNavigationTimeout(5000);
    });

    beforeEach(async () => {
        await page.goto('http://localhost:8080/?view-once=off');
    });

    it('should have a title', async () => {
        const title = await page.title();
        expect(title).toBe('The Daily Lore');
    });

    it('should have a GitHub corner', async () => {
        const navigation = page.waitForNavigation();
        await page.click('#github-corner');
        await navigation;
        const title = await page.title();
        expect(title).toMatch('dguo/dailylore');
    });

    it('should link back to News API', async () => {
        await page.waitForSelector('#footer', {visible: true});
        const navigation = page.waitForNavigation();
        await page.click('a[href*="newsapi"]');
        await navigation;
        const url = await page.url();
        expect(url).toMatch('https://newsapi.org');
    });

    it('should have a GitHub link in the footer', async () => {
        await page.waitForSelector('#footer', {visible: true});
        const link = await page.$('#footer a[href*="github"]');
        expect(link).not.toBeNull();
    });

    it('should have several sources', async () => {
        await page.waitForSelector('a.article', {visible: true});
        const articles = await page.$$('a.article');
        expect(articles.length).toBeGreaterThan(30);
    });

    it('should only show links once when view once is turned on', async () => {
        await page.waitForSelector('a.article', {visible: true});

        // Make sure the collection of viewed links is cleared

        await page.evaluate(() => {
            localStorage.removeItem('viewed');
        });

        // Load the site with view once enabled, and collect the links that
        // have been marked as viewed

        await page.goto('http://localhost:8080/');

        await page.waitForSelector('.viewed', {visible: true});

        const viewedLinks = await page.$$eval('.viewed', (links) => {
            return links.map((link) => link.href);
        });

        expect(viewedLinks.length).toBeGreaterThan(2);

        // After we reload, none of the previously viewed links should be on the
        // page

        await page.reload();

        await page.waitForSelector('.viewed', {visible: true});

        const allLinks = await page.$$eval('a.article', (links) => {
            return links.map((link) => link.href);
        });

        for (let link of viewedLinks) {
            expect(allLinks).not.toContain(link);
        }
    });
});
