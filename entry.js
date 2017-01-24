import 'whatwg-fetch';
import 'autotrack/lib/plugins/outbound-link-tracker';
import debug from 'debug';
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

// If a source logo fails to load, just replace it with the source name in text
window.handleLogoError = function (image) {
    const sourceName = image.alt;
    const parent = image.parentNode;
    parent.removeChild(image);
    parent.innerHTML = sourceName;
}

// http://stackoverflow.com/a/6274398
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        const index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        const temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function getSourceCard(name, logoUrl, homepageUrl, articles) {
    const logo = logoUrl ?
                 `<img class="responsive-img"
                     src="${logoUrl}"
                     alt="${name}"
                     onerror="handleLogoError(this)">` :
                 `<h6 class="deep-orange-text darken-2">${name}</h6>`;

    let card = `<div class="col s12 offset-m1 m10 offset-l1 l10">
                    <ul class="collection hoverable">
                        <li class="collection-item">
                            <div class="center-align">
                                <a href="${homepageUrl}" target="_blank">
                                   ${logo}
                                </a>
                            </div>
                        </li>`;

    const addedTitles = []; // prevent duplicate links

    for (let i = 0; i < 3 && i < articles.length; i++) {
        if (addedTitles.indexOf(articles[i].title) !== -1) {
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

    return `${card}</ul></div>`;
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

    const noImages = location.search.indexOf('img=off') > -1;

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

                const logoUrl = noImages ? null :
                                sourceMetadata.urlsToLogos.small

                const card = getSourceCard(sourceMetadata.name,
                                           logoUrl,
                                           sourceMetadata.url,
                                           sourceDetails.articles);

                const row = document.createElement('div');
                row.innerHTML = `<div class="row">${card}</div>`;

                document.getElementById('main').appendChild(row);
            }

            // Last source
            if (counter === sources.length) {
                // Hide the loading bar without causing the rows to move up
                // slightly
                document.getElementById('loading-bar').style.visibility =
                    'hidden';

                // Unhide the footer
                document.getElementById('footer').className =
                    document.getElementById('footer').className.replace('hide',
                                                                        '');
            }
        }).catch((error) => {
            log.error(error);
        });
    });
}).catch((error) => {
    log.error(error);
});
