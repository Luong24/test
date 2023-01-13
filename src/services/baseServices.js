import Axios from 'axios';
import { DOMAIN, TOKEN } from './../utils/settings/config';


export class baseServices {
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: model
        })
    }
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Token': window.sessionStorage.getItem(TOKEN) }
        })
    }

    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { 'Token': window.sessionStorage.getItem(TOKEN) }
        })
    }


    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { 'Token': window.sessionStorage.getItem(TOKEN) }
        })
    }
}