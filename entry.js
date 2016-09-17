import 'whatwg-fetch';
import 'autotrack/lib/plugins/outbound-link-tracker';
import debug from 'debug';
import './styles.scss';

const log = {
    error: debug('error'),
    info: debug('info')
};

const API_KEY = '198d808f4c7f469bafc18a653d8ee81e';

const BLACKLIST = [
    'espn-cric-info', 'bild', 'wired-de', 'spiegel-online', 'focus',
    'sky-sports-news', 'talksport', 'bbc-sport', 'the-hindu',
    'the-times-of-india'
];

let SOURCES;

// http://stackoverflow.com/a/6274398
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function createCard(source, sourceLogo, sourceUrl, articles) {
    let card = `<div class="col s12 m4">
                    <div class="card-panel hoverable">
                        <div class="center-align">
                            <a href="${sourceUrl}">
                                <img src="${sourceLogo}" alt="${source}">
                            </a>
                        </div>`;

    for (let i = 0; i < 3 && i < articles.length; i++) {
        card += `<hr>
                 <a href="${articles[i].url}">${articles[i].title}</a>
                 <p>
                     ${articles[i].description ? articles[i].description : ''}
                 </p>`;
    }

    return card + '</div></div>';
}

fetch('https://newsapi.org/v1/sources').then((response) => {
    return response.json();
}).then((json) => {
    log.info('response:', JSON.stringify(json, null, 2));

    if (json.status !== 'ok') {
        throw new Error('Failed to get sources: ' + json.status);
    }

    SOURCES = shuffle(json.sources.filter((source) => {
        return !BLACKLIST.includes(source.id);
    }));

    const sourceFetches = SOURCES.map((source) => {
        return fetch(`https://newsapi.org/v1/articles?source=${source.id}` +
                     `&sortBy=${source.sortBysAvailable[0]}&apiKey=${API_KEY}`);
    });

    return Promise.all(sourceFetches);
}).then((sourceResponses) => {
    return Promise.all(sourceResponses.map((sourceResponse) => {
        return sourceResponse.json();
    }));
}).then((sourceDetails) => {
    const rowOpen = '<div class="row">';
    let count = 0;
    let html = rowOpen;

    for (let i = 0; i < sourceDetails.length; i++) {
        const sourceDetail = sourceDetails[i];
        if (sourceDetail.status !== 'ok') {
            log.error(sourceDetail);
            continue;
        }

        // Check to start a new row
        if (count % 3 === 0) {
            html += rowOpen;
        }

        count++;
        const card = createCard(SOURCES[i].name, SOURCES[i].urlsToLogos.small,
                                SOURCES[i].url, sourceDetail.articles);

        html += card;

        // Close out the row
        if (count % 3 === 0) {
            html += '</div>';
        }
    }

    // Close out the last row if it has fewer than 3 elements
    if (count % 3 !== 0) {
        html += '</div>';
    }

    log.info(html);
    document.getElementById('main').innerHTML = html;

    const loadingBar = document.getElementById('loading-bar');
    loadingBar.parentNode.removeChild(loadingBar);

    document.getElementById('footer').className =
        document.getElementById('footer').className.replace('hide', '');
}).catch((error) => {
    log.error(error);
});

