# [The Daily Lore](https://www.dailylore.com/) [![Build Status](https://travis-ci.org/dguo/dailylore.svg?branch=master)](https://travis-ci.org/dguo/dailylore)

Lightweight, static news aggregation website

## Tools and Infrastructure
* [News API](https://newsapi.org) for the headlines
* [Materialize](http://materializecss.com) for styling
    * [Custom build](https://github.com/dguo/dailylore/blob/master/styles.scss)
      to avoid including unused components
* [Travis CI](https://travis-ci.org/) for continuous integration
    * It also clears the CloudFlare cache when the master branch is updated
* [GitHub Pages](https://pages.github.com) for hosting
* [CloudFlare](https://www.cloudflare.com) for SSL and caching
* [Google Analytics](https://www.google.com/analytics/) for tracking pageviews
* [StatusCake](https://www.statuscake.com/) for monitoring

## Development
If you have [Docker](https://docs.docker.com/) installed, you can develop using
the `dev` script. Run `$ ./dev -h` to see the options.

If you make any changes to the source, the bundle will be rebuilt, and the page
should refresh by itself (thanks to
[webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)).

`$ ./dev prod` builds a production JavaScript bundle.

To view [debug](https://github.com/visionmedia/debug#browser-support) output,
set `localStorage.debug = '*';` in the browser console, and reload the page.

## License
MIT
