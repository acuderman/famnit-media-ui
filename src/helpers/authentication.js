import * as axios from 'axios'
import { API_BASE_URI } from '../config'

export async function getAccessToken(id_token, youtube_access_token) {
    const response = await axios.post(`${API_BASE_URI}/auth/token`, {
        id_token,
        youtube_access_token,
    })

    return response.data.access_token
}

export async function verifyAccessToken(token) {
    return axios.post(`${API_BASE_URI}/auth/verify`,{}, { headers: { authorization: `Bearer ${token}` }})
}