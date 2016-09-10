import 'whatwg-fetch';

const API_KEY = '198d808f4c7f469bafc18a653d8ee81e';

fetch('https://newsapi.org/v1/sources').then((response) => {
    return response.json();
}).then((json) => {
    console.log('response:', json);

    if (json.status !== 'ok') {
        throw new Error('Failed to get sources: ' + json.status);
    }

    const sourceFetches = json.sources.map((source) => {
        return fetch(`https://newsapi.org/v1/articles?source=${source.id}&sortBy=${source.sortBysAvailable[0]}&apiKey=${API_KEY}`);
    });

    return Promise.all(sourceFetches);
}).then((sourceResponses) => {
    return Promise.all(sourceResponses.map((sourceResponse) => {
        return sourceResponse.json();
    }));
}).then((sources) => {
    for (const source of sources) {
        console.log(source);
    }
}).catch((error) => {
    console.error('Error:', error);
});

