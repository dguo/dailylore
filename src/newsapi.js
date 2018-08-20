import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';

// 100 is the maximum allowed
const PAGE_SIZE = 100;

const SOURCES = [
    'abc-news',
    'ars-technica',
    'associated-press',
    'bbc-news',
    'bloomberg',
    'business-insider',
    'buzzfeed',
    'cbs-news',
    'cnbc',
    'cnn',
    'engadget',
    'entertainment-weekly',
    'espn',
    'financial-times',
    'fortune',
    'fox-sports',
    'google-news',
    'ign',
    'mashable',
    'msnbc',
    'mtv-news',
    'national-geographic',
    'nbc-news',
    'new-scientist',
    'newsweek',
    'new-york-magazine',
    'nfl-news',
    'politico',
    'polygon',
    'recode',
    'reuters',
    'techcrunch',
    'techradar',
    'the-economist',
    'the-huffington-post',
    'the-new-york-times',
    'the-next-web',
    'the-telegraph',
    'the-verge',
    'the-wall-street-journal',
    'the-washington-post',
    'time',
    'usa-today'
];

function requestHeadlines(page, apiKey) {
    const options = {
        headers: {'X-Api-Key': apiKey}
    };

    return axios.get(
        `${BASE_URL}/top-headlines?page=${page}&pageSize=${PAGE_SIZE}&sources=${SOURCES.join(
            ','
        )}`,
        options
    );
}

function requestSources(apiKey) {
    const options = {
        headers: {'X-Api-Key': apiKey}
    };

    return axios.get(`${BASE_URL}/sources`, options);
}

function storeArticles(store, articles) {
    for (const article of articles) {
        if (!article.title || !article.url) {
            continue;
        }

        const source = article.source;
        const trimmedArticle = {
            title: article.title,
            url: article.url
        };

        if (store.hasOwnProperty(source.id)) {
            if (store[source.id].articles.length < 3) {
                store[source.id].articles.push(trimmedArticle);
            }
        } else {
            store[source.id] = {
                name: source.name,
                articles: [trimmedArticle]
            };
        }
    }
}

export function getSourcesWithArticles(apiKey) {
    const sources = {};
    const sourceUrls = {};

    return requestSources(apiKey)
        .then(response => {
            const data = response.data;

            if (data.status !== 'ok') {
                throw new Error(data.message);
            }

            for (let {id, url} of data.sources) {
                sourceUrls[id] = url;
            }

            return requestHeadlines(1, apiKey);
        })
        .then(response => {
            const data = response.data;

            if (data.status !== 'ok') {
                throw new Error(data.message);
            }

            const totalResults = data.totalResults;
            const numPages = Math.ceil(totalResults / PAGE_SIZE);

            storeArticles(sources, data.articles);

            const getRemainingPages = [];
            for (let page = 2; page <= numPages; page++) {
                getRemainingPages.push(requestHeadlines(page, apiKey));
            }

            return axios.all(getRemainingPages);
        })
        .then(responses => {
            for (let response of responses) {
                const data = response.data;

                if (data.status === 'ok') {
                    storeArticles(sources, data.articles);
                }
            }

            return Object.entries(sources).map(([id, source]) => {
                source.url = sourceUrls[id];
                return source;
            });
        });
}
