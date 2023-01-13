import { DOMAIN2, TOKEN } from "../utils/settings/config"
import Axios from 'axios';

export class accoutService {
    get = (url) => {
        return Axios({
            url: `${DOMAIN2}/${url}`,
            method: 'GET',
            headers: { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}` }
        })
    }
}