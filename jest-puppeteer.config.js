/* eslint-env node */

const args = [];

if (process.env.CI) {
    // Required for Travis. See:
    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-on-travis-ci
    args.push('--no-sandbox');
}

module.exports = {
    launch: {
        args,
        headless:
            process.env.HEADLESS !== '0' && process.env.HEADLESS !== 'false'
    }
};
