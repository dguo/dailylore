import 'autotrack/lib/plugins/outbound-link-tracker';
import debug from 'debug';
import storageAvailable from 'storage-available';

import './styles.scss';
import {getSourcesWithArticles} from './newsapi';

const log = debug('lore');

// Delete viewed links that are old to avoid hitting the localStorage limit.
function pruneViewedLinks() {
    if (!storageAvailable('localStorage')) {
        return;
    }

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

document.getElementById('loading-bar').style.visibility = 'visible';

getSourcesWithArticles()
    .then(sources => {
        let viewed = {};
        if (hideViewed) {
            try {
                viewed = JSON.parse(localStorage.getItem('viewed')) || viewed;
            } catch (e) {} // eslint-disable-line no-empty
        }

        const main = document.getElementById('main');
        const endMessage = document.getElementById('end-message');

        for (let source of sources) {
            const card = getSourceCard(
                source.name,
                source.url,
                source.articles,
                viewed
            );

            if (card) {
                const row = document.createElement('div');
                row.innerHTML = `<div class="row">${card}</div>`;
                main.insertBefore(row, endMessage);
            }
        }

        // Hide the loading bar without causing the rows to move up
        // slightly
        document.getElementById('loading-bar').style.visibility = 'hidden';

        // Unhide the end message and footer
        endMessage.classList.remove('hide');
        document.getElementById('footer').classList.remove('hide');

        if (hideViewed) {
            checkVisibility();
        }

        pruneViewedLinks();
    })
    .catch(error => {
        log(error.message);
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
