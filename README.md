# [The Daily Lore](https://www.dailylore.com/) [![Build Status](https://travis-ci.org/dguo/dailylore.svg?branch=master)](https://travis-ci.org/dguo/dailylore)

Lightweight, static news aggregation website

## Infrastructure
* [News API](https://newsapi.org) for the headlines
* [Materialize](http://materializecss.com) for styling
    * [Custom build](https://github.com/dguo/dailylore/blob/master/styles.scss)
      to avoid including unused components
* [GitHub Pages](https://pages.github.com) for hosting
* [CloudFlare](https://www.cloudflare.com) for SSL and caching
    * [Travis CI](https://travis-ci.org/) clears the CloudFlare cache when the
      master branch is updated

## Development
* `$ npm install`
* `$ npm run dev`
    * This will build the JavaScript bundle, and open the website in your
      default browser
    * If you make any changes to the source, the bundle will be rebuilt, and the
      page should refresh by itself
      (thanks to [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html))
* `$ npm run build`
    * This will build the production version of the JavaScript bundle

