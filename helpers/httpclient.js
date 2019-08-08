const toQueryString =  (json) => {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

const genericRequest = async (url, request, verb) => {
    const response = await fetch(url, {
        method: verb,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    }).then(response => response.json())

    return response
}

const post = async (url, request) => {
    return genericRequest(url, request, 'POST');
}

const get = async (url, request) => {
    const query = toQueryString(request);
    const response = await fetch(`${url}${query}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    return response;
}

const patch = async (url, request) => {
    return genericRequest(url, request, 'PATCH');
}

const httpClient = {
    post,
    get,
    patch
}

module.exports = httpClient;