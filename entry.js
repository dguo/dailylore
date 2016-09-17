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
    't3n', 'football-italia', 'four-four-two'
];

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
    let card = `<div class="col s12 m4">
                    <div class="card-panel hoverable">
                        <div class="center-align">
                            <a href="${homepageUrl}" target="_blank">
                                <img src="${logoUrl}" alt="${name}">
                            </a>
                        </div>`;

    for (let i = 0; i < 3 && i < articles.length; i++) {
        card += `<hr>
                 <a href="${articles[i].url}" target="_blank">
                     ${articles[i].title}
                 </a>
                 <p>
                     ${articles[i].description ? articles[i].description : ''}
                 </p>`;
    }

    return card + '</div></div>';
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

    let html = '';
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
                if (!html) {
                    html = '<div class="row">';
                }

                const sourceMetadata = sources.find(source =>
                    source.id === sourceDetails.source
                );

                const card = getSourceCard(sourceMetadata.name,
                                              sourceMetadata.urlsToLogos.small,
                                              sourceMetadata.url,
                                              sourceDetails.articles);

                html += card;

                // Close out the row, and add it to the page
                if (counter % 3 === 0) {
                    const row = document.createElement('div');
                    row.innerHTML = html + '</div>';

                    document.getElementById('main').appendChild(row);

                    html = '';
                }
            }

            // Last source
            if (counter === sources.length) {
                // Close out the last row if it has fewer than 3 elements
                if (counter % 3 !== 0) {
                    html += '</div>';
                }

                if (html) {
                    const lastRow = document.createElement('div');
                    lastRow.innerHTML = html;

                    document.getElementById('main').appendChild(lastRow);
                }

                // Remove the loading bar
                const loadingBar = document.getElementById('loading-bar');
                loadingBar.parentNode.removeChild(loadingBar);

                // Unhide the footer
                document.getElementById('footer').className =
                    document.getElementById('footer').className.replace('hide', '');
            }
        }).catch((error) => {
            log.error(error);
        });
    });
}).catch((error) => {
    log.error(error);
});

