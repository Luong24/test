import { DOMAIN2 } from "../utils/settings/config"
import Axios from 'axios';

export class accoutService {
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN2}/${url}`,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: model
        })
    }
}