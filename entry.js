import 'whatwg-fetch';
import 'autotrack/lib/plugins/outbound-link-tracker';
import debug from 'debug';
import shuffle from 'lodash.shuffle';
import storageAvailable from 'storage-available';

import './styles.scss';

const log = debug('lore');

const API_KEY = '198d808f4c7f469bafc18a653d8ee81e';

const WHITELIST = [
    'ars-technica',
    'associated-press',
    'bbc-news',
    'bloomberg',
    'business-insider',
    'buzzfeed',
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
    'mtv-news',
    'national-geographic',
    'new-scientist',
    'newsweek',
    'new-york-magazine',
    'nfl-news',
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

// Delete viewed links that are old to avoid hitting the localStorage limit.
function pruneViewedLinks() {
    if (storageAvailable('localStorage')) {
        const now = new Date();

        const viewed = JSON.parse(localStorage.getItem('viewed')) || {};
        for (const link in viewed) {
            const viewedTime = new Date(viewed[link]);
            const daysOld = (now - viewedTime) / 1000 / 60 / 60 / 24;

            if (daysOld > 7) {
                delete viewed[link];
            }
        }

        log('Number of viewed links:', Object.keys(viewed).length);

        try {
            localStorage.setItem('viewed', JSON.stringify(viewed));
        } catch (error) {
            localStorage.removeItem('viewed');
        }
    }
}

function getSourceCard(name, homepageUrl, articles, viewed) {
    const logo = `<h6 class="deep-orange-text darken-2">${name}</h6>`;

    let card = `<div class="col s12 offset-m1 m10 offset-l1 l10">
                    <ul class="collection">
                        <li class="collection-item">
                            <div class="center-align">
                                <a href="${homepageUrl}" target="_blank">
                                   ${logo}
                                </a>
                            </div>
                        </li>`;

    const addedTitles = []; // prevent duplicate links

    for (let i = 0; i < 3; i++) {
        if (
            addedTitles.indexOf(articles[i].title) !== -1 ||
            viewed.hasOwnProperty(articles[i].url)
        ) {
            continue;
        }

        addedTitles.push(articles[i].title);

        card += `<li class="collection-item">
                     <a class="article"
                         href="${articles[i].url}"
                         target="_blank">
                         ${articles[i].title}
                     </a>
                 </li>`;
    }

    return addedTitles.length ? `${card}</ul></div>` : null;
}

let hideViewed = true;
if (
    storageAvailable('localStorage') &&
    localStorage.getItem('viewOnce') === 'off'
) {
    hideViewed = false;
} else {
    location.search
        .slice(1)
        .split('&')
        .forEach(pair => {
            const [key, value] = pair.split('=');
            if (key === 'view-once' && value === 'off') {
                hideViewed = false;
            }
        });
}

if (!hideViewed) {
    document.getElementById('view-once').checked = false;
} else {
    let throttle = false;
    var checkVisibility = function() {
        if (throttle) {
            return;
        }

        const bottom =
            window.innerHeight || document.documentElement.clientHeight;
        const articles = document.querySelectorAll('a.article:not(.viewed)');

        if (articles.length === 0) {
            window.removeEventListener('scroll', checkVisibility);
        }

        const hrefs = {};

        for (let i = 0; i < articles.length; i++) {
            const rect = articles[i].getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= bottom) {
                const href = articles[i].getAttribute('href');
                hrefs[href] = new Date().toISOString();

                // To avoid checking it again
                articles[i].classList.add('viewed');
            }

            if (rect.bottom > bottom) {
                break;
            }
        }

        if (Object.keys(hrefs).length) {
            let viewed = {};
            try {
                viewed = JSON.parse(localStorage.getItem('viewed')) || viewed;
            } catch (err) {} // eslint-disable-line no-empty

            Object.assign(viewed, hrefs);

            try {
                localStorage.setItem('viewed', JSON.stringify(viewed));
            } catch (error) {
                localStorage.removeItem('viewed');
            }
        }

        throttle = true;
        setTimeout(function() {
            throttle = false;
        }, 200);
    };

    window.addEventListener('scroll', checkVisibility);
}

fetch('https://newsapi.org/v1/sources')
    .then(response => response.json())
    .then(json => {
        if (json.status !== 'ok') {
            throw new Error('Failed to get sources: ' + json.status);
        }

        const sources = shuffle(
            json.sources.filter(source => WHITELIST.includes(source.id))
        );

        let viewed = {};
        if (hideViewed) {
            try {
                viewed = JSON.parse(localStorage.getItem('viewed')) || viewed;
            } catch (e) {} // eslint-disable-line no-empty
        }

        const main = document.getElementById('main');
        const endMessage = document.getElementById('end-message');

        sources.forEach((source, index) => {
            fetch(
                `https://newsapi.org/v1/articles?source=${source.id}` +
                    `&sortBy=${source.sortBysAvailable[0]}&apiKey=${API_KEY}`
            )
                .then(sourceResponse => sourceResponse.json())
                .then(sourceDetails => {
                    if (sourceDetails.status !== 'ok') {
                        log('Bad source response:', sourceDetails);
                    } else {
                        const sourceMetadata = sources.find(
                            source => source.id === sourceDetails.source
                        );

                        const card = getSourceCard(
                            sourceMetadata.name,
                            sourceMetadata.url,
                            sourceDetails.articles,
                            viewed
                        );

                        if (card) {
                            const row = document.createElement('div');
                            row.innerHTML = `<div class="row">${card}</div>`;
                            main.insertBefore(row, endMessage);
                        }
                    }

                    // Last source
                    if (index + 1 >= sources.length) {
                        // Hide the loading bar without causing the rows to move up
                        // slightly
                        document.getElementById(
                            'loading-bar'
                        ).style.visibility = 'hidden';

                        // Unhide the end message and footer
                        endMessage.classList.remove('hide');
                        document
                            .getElementById('footer')
                            .classList.remove('hide');

                        if (hideViewed) {
                            checkVisibility();
                        }

                        pruneViewedLinks();
                    }
                })
                .catch(error => {
                    log(error);
                });
        });
    })
    .catch(error => {
        log(error);
    });

document.getElementById('view-once').addEventListener('change', function() {
    if (storageAvailable('localStorage')) {
        try {
            localStorage.setItem('viewOnce', this.checked ? 'on' : 'off');
        } catch (error) {
            localStorage.removeItem('viewed');
        }
    } else {
        const url = location.origin + (this.checked ? '' : '?view-once=off');
        location.href = url;
    }
});
