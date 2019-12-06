# The Daily Lore

[![Netlify Status](https://api.netlify.com/api/v1/badges/f2e1efb6-58fe-48f0-8493-1f9de6430362/deploy-status)](https://app.netlify.com/sites/the-daily-lore/deploys)
[![CI status](https://github.com/dguo/dailylore/workflows/CI/badge.svg)](https://github.com/dguo/dailylore/actions?query=branch%3Amaster)

[The Daily Lore](https://www.dailylore.com/) is a lightweight, static news
aggregation website.

## Tools and Infrastructure

* [News API](https://newsapi.org) for the headlines
* [Materialize](http://materializecss.com) for styling
    * [Custom build](https://github.com/dguo/dailylore/blob/master/styles.scss)
      to avoid including unused components
* [Travis CI](https://travis-ci.org/) for continuous integration
* [Netlify](https://www.netlify.com/) for hosting and continuous deployment
* [Google Analytics](https://www.google.com/analytics/) for tracking pageviews
* [StatusCake](https://www.statuscake.com/) for monitoring
* [IFTTT](https://ifttt.com/) for [triggering hourly rebuilds](https://ifttt.com/date_and_time) to update the headlines through a [Netlify webhook](https://www.netlify.com/docs/webhooks/)

## Development

Check out the scripts in `package.json`. You can also develop using the `dev`
script. Run `$ ./dev` to see the options. To get started, run `$ yarn start` or
`$ ./dev start`.

If you make any changes to the source, the bundle will be rebuilt, and the page
should refresh by itself (thanks to
[webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)).

To view [debug](https://github.com/visionmedia/debug#browser-support) output,
set `localStorage.debug = 'lore';` in the browser console, and reload the page.

The tests use [Puppeteer](https://github.com/GoogleChrome/puppeteer), which
controls a headless instance of Chrome. If you need to debug the tests, you can
turn headless mode off with `$ HEADLESS=0 dev test` so that you can actually
see the browser. You can also add an `await jestPuppeteer.debug();` statement
to the test to [suspend
execution](https://github.com/smooth-code/jest-puppeteer#put-in-debug-mode).
Lastly, you can add the `slowMo`
[option](https://github.com/GoogleChrome/puppeteer#debugging-tips) to
`jest-puppeteer.config.js` to slow everything down.

## Legacy

This website was one of my earliest projects, and I abandoned it for a few
years before reviving it. The (terrible) legacy source code is in [this
repo](https://github.com/dguo/headlines).

## License

[MIT](https://github.com/dguo/dailylore/blob/master/LICENSE)
