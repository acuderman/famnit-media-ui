import * as Cookie from "js-cookie";

export function getToken () {
    return Cookie.get('token')
}