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

    // it('should have several sources', async () => {
    // await page.waitForSelector('#footer', {visible: true});
    // const articles = await page.$('.article');
    // expect(articles.length).toBeGreaterThan(30);
    // });

    // it('should have an external link', () => {
    // browser.waitForVisible('footer');
    // const numTabs = browser.getTabIds().length;
    // browser.click('.row .article');
    // assert.equal(browser.getTabIds().length, numTabs + 1);
    // });
    // it('should only show links once when view once is turned on', () => {
    // Make sure the collection of viewed links is cleared
    // browser.waitForExist('.article');
    // browser.localStorage('DELETE', 'viewed');
    // Load the site with view once enabled, and collect the links that
    // have been marked as viewed
    // browser.url('/');
    // browser.waitForVisible('footer');
    // assert.isAbove(browser.elements('.article').value.length, 30);
    // const viewed = new Set();
    // browser.waitUntil(() => {
    // const elements = browser.elements('.viewed').value;
    // if (elements.length) {
    // elements.forEach(element => {
    // const href = browser.elementIdAttribute(
    // element.ELEMENT,
    // 'href'
    // ).value;
    // viewed.add(href);
    // });
    // return true;
    // }
    // return false;
    // }, 300);
    // Refresh, and make sure none of the previously viewed links are on the
    // page
    // browser.refresh();
    // browser.waitForExist('.viewed');
    // const elements = browser.elements('.article').value;
    // elements.forEach(element => {
    // const href = browser.elementIdAttribute(element.ELEMENT, 'href')
    // .value;
    // assert.notInclude(viewed, href);
    // });
    // });
});
