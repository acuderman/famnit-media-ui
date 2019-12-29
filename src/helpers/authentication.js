import * as axios from 'axios'
import { API_BASE_URI } from '../config'

export async function getAccessToken(id_token, youtube_access_token) {
    return axios.post(`${API_BASE_URI}/auth/token`, {
        id_token,
        youtube_access_token,
    })
}

export async function verifyAccessToken(token) {
    return axios.post(`${API_BASE_URI}/auth/verify`, { headers: `Bearer ${token}`})
}