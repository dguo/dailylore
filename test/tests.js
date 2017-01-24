/* eslint-env node, mocha */
/* global browser */

const assert = require('chai').assert;

describe('The Daily Lore', () => {
    it('should have a title', () => {
        assert.equal(browser.getTitle(), 'The Daily Lore');
    });

    it('should have a GitHub corner', () => {
        browser.click('#github-corner');
        assert.equal(browser.getUrl(), 'https://github.com/dguo/dailylore');
    });

    it('should link back to News API', () => {
        browser.waitForVisible('footer');
        browser.click('=Powered by NewsAPI.org');
        assert.equal(browser.getUrl(), 'https://newsapi.org/');
    });

    it('should have a GitHub link in the footer', () => {
        browser.waitForVisible('footer');
        browser.click('=GitHub');
        assert.equal(browser.getUrl(), 'https://github.com/dguo/dailylore/');
    });

    it('should have a link to imageless mode', () => {
        browser.waitForVisible('footer');
        browser.click('=Imageless mode');
        assert.equal(browser.elements('img').value.length, 0);
    });

    it('should have several sources', () => {
        browser.waitForVisible('footer');
        assert.isAbove(browser.elements('.row').value.length, 30);
    });

    it('should have an external link', () => {
        browser.waitForVisible('footer');
        const numTabs = browser.getTabIds().length;
        browser.click('.row .article');
        assert.equal(browser.getTabIds().length, numTabs + 1);
    });
});
