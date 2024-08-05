const PATH = {
    url: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
        authorization: '28e600d6-9636-4d02-9a35-55a123911178',
        'Content-Type': 'application/json'
    }

} 

const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const getDataProfile = () => {
    return fetch(`${PATH.url}/users/me`, {
        method: 'GET',
        headers: PATH.headers
    })
        .then(res => handleResponse(res));
}

export const updateDataProfile = (userData) => {
    return fetch(`${PATH.url}/users/me`, {
        method: 'PATCH',
        headers: PATH.headers,
        body: JSON.stringify({
            name: userData.name,
            about: userData.about
        })
    })
        .then(res => handleResponse(res));
}

export const getDataCards = () => {
    return fetch(`${PATH.url}/cards`, {
        method: 'GET',
        headers: PATH.headers
    })
        .then(res => handleResponse(res));
}

export const sendCardData = (data) => {
    return fetch(`${PATH.url}/cards`, {
        method: 'POST',
        headers: PATH.headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link
        })
    })
        .then(res => handleResponse(res));
}

export function deleteCardRequest(cardId) {
    return fetch(`${PATH.url}/cards/` + cardId, {
        method: 'DELETE',
        headers: PATH.headers,
    })
        .then(res => handleResponse(res));
}

export function addLikeRequest(cardId) {
    return fetch(`${PATH.url}/cards/likes/` + cardId, {
        method: 'PUT',
        headers: PATH.headers,
    })
        .then(res => handleResponse(res));
}

export function deleteLikeRequest(cardId) {
    return fetch(`${PATH.url}/cards/likes/` + cardId, {
        method: 'DELETE',
        headers: PATH.headers,
    })
        .then(res => handleResponse(res));
}

export function changeUserAvatar(avatarUrl) {
    return fetch(`${PATH.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: PATH.headers,
        body: JSON.stringify({
            avatar: avatarUrl,
        })
    })
        .then(res => handleResponse(res));
}
