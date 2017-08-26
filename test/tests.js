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
        browser.click('=News API');
        assert.equal(browser.getUrl(), 'https://newsapi.org/');
    });

    it('should have a GitHub link in the footer', () => {
        browser.waitForVisible('footer');
        browser.click('=GitHub');
        assert.equal(browser.getUrl(), 'https://github.com/dguo/dailylore/');
    });

    it('should have several sources', () => {
        browser.waitForVisible('footer');
        assert.isAbove(browser.elements('.article').value.length, 30);
    });

    it('should have an external link', () => {
        browser.waitForVisible('footer');
        const numTabs = browser.getTabIds().length;
        browser.click('.row .article');
        assert.equal(browser.getTabIds().length, numTabs + 1);
    });

    it('should only show links once when view once is turned on', () => {
        // Make sure the collection of viewed links is cleared
        browser.waitForExist('.article');
        browser.localStorage('DELETE', 'viewed');

        // Load the site with view once enabled, and collect the links that
        // have been marked as viewed
        browser.url('/');
        browser.waitForVisible('footer');
        assert.isAbove(browser.elements('.article').value.length, 30);
        const viewed = new Set();
        browser.waitUntil(() => {
            const elements = browser.elements('.viewed').value;
            if (elements.length) {
                elements.forEach((element) => {
                    const href = browser.elementIdAttribute(
                        element.ELEMENT,
                        'href'
                    ).value;
                    viewed.add(href);
                });
                return true;
            }
            return false;
        }, 300);

        // Refresh, and make sure none of the previously viewed links are on the
        // page
        browser.refresh();
        browser.waitForExist('.viewed');
        const elements = browser.elements('.article').value;
        elements.forEach((element) => {
            const href = browser.elementIdAttribute(
                element.ELEMENT,
                'href'
            ).value;
            assert.notInclude(viewed, href);
        });
    });
});
