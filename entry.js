import 'whatwg-fetch';
import 'autotrack/lib/plugins/outbound-link-tracker';
import debug from 'debug';
import shuffle from 'lodash.shuffle';

import './styles.scss';

const log = {
    error: debug('error'),
    info: debug('info')
};

const API_KEY = '198d808f4c7f469bafc18a653d8ee81e';

const WHITELIST = [
    'ars-technica', 'associated-press', 'bbc-news', 'bloomberg',
    'business-insider', 'buzzfeed', 'cnbc', 'cnn', 'engadget',
    'entertainment-weekly', 'espn', 'financial-times', 'fortune', 'fox-sports',
    'google-news', 'ign', 'mashable', 'mtv-news', 'national-geographic',
    'new-scientist', 'newsweek', 'new-york-magazine', 'nfl-news', 'polygon',
    'recode', 'reuters', 'techcrunch', 'techradar', 'the-economist',
    'the-huffington-post', 'the-new-york-times', 'the-next-web',
    'the-telegraph', 'the-verge', 'the-wall-street-journal',
    'the-washington-post', 'time', 'usa-today'
];

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
function storageAvailable(type) {
    try {
        var storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something
            // already stored
            storage.length !== 0;
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

    for (let i = 0; i < 3 && i < articles.length; i++) {
        if (addedTitles.indexOf(articles[i].title) !== -1 ||
            viewed.hasOwnProperty(articles[i].url)) {
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

const hideViewed = storageAvailable('localStorage');

if (hideViewed) {
    let throttle = false;
    var checkVisibility = function() {
        if (throttle) {
            return;
        }

        const bottom = window.innerHeight || document.documentElement.clientHeight;
        const articles = document.querySelectorAll('a.article:not(.viewed)');

        if (articles.length === 0) {
            window.removeEventListener('scroll', checkVisibility);
        }

        const hrefs = {};

        for (let i = 0; i < articles.length; i++) {
            const rect = articles[i].getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= bottom) {
                const href = articles[i].getAttribute('href');
                hrefs[href] = (new Date()).toISOString();

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

            localStorage.setItem('viewed', JSON.stringify(viewed));
        }

        throttle = true;
        setTimeout(function() {
            throttle = false;
        }, 200);
    };

    window.addEventListener('scroll', checkVisibility);
}

fetch('https://newsapi.org/v1/sources').then(response =>
    response.json()
).then(json => {
    log.info('response:', JSON.stringify(json, null, 2));

    if (json.status !== 'ok') {
        throw new Error('Failed to get sources: ' + json.status);
    }

    const sources = shuffle(json.sources.filter(source =>
        WHITELIST.includes(source.id)
    ));

    let counter = 0;

    let viewed = {};
    if (hideViewed) {
        try {
            viewed = JSON.parse(localStorage.getItem('viewed')) || viewed;
        } catch (e) {} // eslint-disable-line no-empty
    }

    const main = document.getElementById('main');
    const endMessage = document.getElementById('end-message');

    sources.forEach(source => {
        fetch(`https://newsapi.org/v1/articles?source=${source.id}` +
              `&sortBy=${source.sortBysAvailable[0]}&apiKey=${API_KEY}`)
        .then(sourceResponse => sourceResponse.json())
        .then(sourceDetails => {
            counter++;

            if (sourceDetails.status !== 'ok') {
                log.error(sourceDetails);
            }
            else {
                const sourceMetadata = sources.find(source =>
                    source.id === sourceDetails.source
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
            if (counter >= sources.length) {
                // Hide the loading bar without causing the rows to move up
                // slightly
                document.getElementById('loading-bar').style.visibility =
                    'hidden';

                // Unhide the end message and footer
                endMessage.classList.remove('hide');
                document.getElementById('footer').classList.remove('hide');

                if (hideViewed) {
                    checkVisibility();
                }
            }
        }).catch((error) => {
            log.error(error);
        });
    });
}).catch((error) => {
    log.error(error);
});

document.getElementById('view-once').addEventListener('change', function () {
    console.log(this.checked);
});
