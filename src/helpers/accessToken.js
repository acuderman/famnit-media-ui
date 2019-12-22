import * as Cookie from 'js-cookie'

export async function setAccessToken(value) {
    Cookie.set('token', value)
}

export async function getAccessToken() {
    Cookie.get('token')
}

export async  function removeAccessToken() {
    Cookie.remove("token")
}
