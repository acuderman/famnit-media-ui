import * as axios from 'axios'
import { API_BASE_URI } from '../config'

export async function verifyAccessToken(token) {
    console.log(token)
    return axios.get(`${API_BASE_URI}/verify`, { headers: { authorization: `Bearer ${token}` }})
}