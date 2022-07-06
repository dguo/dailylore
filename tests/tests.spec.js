import {test, expect} from '@playwright/test';

test.describe('The Daily Lore', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:3000/?view-once=off');
    });

    test('should have a title', async ({page}) => {
        const title = await page.title();
        expect(title).toBe('The Daily Lore');
    });

    test('should have a GitHub corner', async ({page}) => {
        const navigation = page.waitForNavigation();
        await page.click('#github-corner');
        await navigation;
        const title = await page.title();
        expect(title).toMatch('dguo/dailylore');
    });

    test('should link back to News API', async ({page}) => {
        await page.waitForSelector('#footer', {visible: true});
        const navigation = page.waitForNavigation();
        await page.click('a[href*="newsapi"]');
        await navigation;
        const url = await page.url();
        expect(url).toMatch('https://newsapi.org');
    });

    test('should have a GitHub link in the footer', async ({page}) => {
        await page.waitForSelector('#footer', {visible: true});
        const link = await page.$('#footer a[href*="github"]');
        expect(link).not.toBeNull();
    });

    test('should have several sources', async ({page}) => {
        await page.waitForSelector('a.article', {visible: true});
        const articles = await page.$$('a.article');
        expect(articles.length).toBeGreaterThan(30);
    });

    test('should only show links once when view once is turned on', async ({
        page
    }) => {
        await page.waitForSelector('a.article', {visible: true});

        // Make sure the collection of viewed links is cleared

        await page.evaluate(() => {
            localStorage.removeItem('viewed');
        });

        // Load the site with view once enabled, and collect the links that
        // have been marked as viewed

        await page.goto('http://localhost:3000/');

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
