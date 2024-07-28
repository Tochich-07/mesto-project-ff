const PATH = 'https://nomoreparties.co/v1/pwff-cohort-1'

const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const getDataProfile = () => {
    return fetch(`${PATH}/users/me`, {
        method: 'GET',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178'
        }
    })
        .then(res => handleResponse(res));
}

export const updateDataProfile = (userData) => {
    return fetch(`${PATH}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userData.name,
            about: userData.about
        })
    })
        .then(res => handleResponse(res));
}

export const getDataCards = () => {
    return fetch(`${PATH}/cards`, {
        method: 'GET',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178'
        }
    })
        .then(res => handleResponse(res));
}

export const sendCardData = (data) => {
    return fetch(`${PATH}/cards`, {
        method: 'POST',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            link: data.link
        })
    })
        .then(res => handleResponse(res));
}

export function deleteCardRequest(cardId) {
    return fetch(`${PATH}/cards/` + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178',
            'Content-Type': 'application/json'
        },
    })
        .then(res => handleResponse(res));
}

export function addLikeRequest(cardId) {
    return fetch(`${PATH}/cards/likes/` + cardId, {
        method: 'PUT',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178',
            'Content-Type': 'application/json'
        },
    })
        .then(res => handleResponse(res));
}

export function deleteLikeRequest(cardId) {
    return fetch(`${PATH}/cards/likes/` + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178',
            'Content-Type': 'application/json'
        },
    })
        .then(res => handleResponse(res));
}

export function changeUserAvatar(avatarUrl) {
    return fetch(`${PATH}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: '28e600d6-9636-4d02-9a35-55a123911178',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarUrl,
        })
    })
        .then(res => handleResponse(res));
}
