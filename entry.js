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
    'the-times-of-india', 'gruenderszene', 'the-sport-bible',
    't3n', 'football-italia', 'four-four-two', 'abc-news-au', 'the-guardian-au',
    'daily-mail', 'mtv-news-uk', 'independent', 'mirror', 'business-insider-uk',
    'the-guardian-uk', 'the-telegraph', 'metro', 'sky-news'
];

const MAX_DESCRIPTION_LENGTH = 400;

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
    let card = `<div class="col s12 offset-m1 m10 offset-l1 l10">
                    <ul class="collection hoverable">
                        <li class="collection-item">
                            <div class="center-align">
                                <a href="${homepageUrl}" target="_blank">
                                    <img class="responsive-img"
                                         src="${logoUrl}"
                                         alt="${name}"
                                         onerror="handleLogoError(this)">
                                </a>
                            </div>
                        </li>`;

    const addedTitles = []; // prevent duplicate links

    for (let i = 0; i < 3 && i < articles.length; i++) {
        if (addedTitles.indexOf(articles[i].title) !== -1) {
            continue;
        }

        addedTitles.push(articles[i].title);

        let description = articles[i].description ?
                          articles[i].description : '';
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            description = description.substr(0, MAX_DESCRIPTION_LENGTH).trim() +
                          '&hellip;';
        }

        card += `<li class="collection-item">
                     <a class="article"
                         href="${articles[i].url}"
                         target="_blank">
                         ${articles[i].title}
                     </a>
                     <p>
                         ${description}
                     </p>
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
        !BLACKLIST.includes(source.id)
    ));

    let counter = 0;

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

                const card = getSourceCard(sourceMetadata.name,
                                           sourceMetadata.urlsToLogos.small,
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

