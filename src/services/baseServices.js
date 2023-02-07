import Axios from 'axios';
import { DOMAIN, TOKEN } from './../utils/settings/config';


export class baseServices {
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}` },
            data: model
        })
    }
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}` }
        })
    }

    patch = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PATCH',
            data: model,
            headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}` }
        })
    }

    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}` }
        })
    }


    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}` }
        })
    }
}