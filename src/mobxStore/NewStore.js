
import { manageNewService } from './../services/ManageNewService';
import { useState } from 'react';



export function NewStore() {
    const [news, setNews] = useState();

    return {
        lstNew: [news],
        async getNew() {
            const result = await manageNewService.getAllNew();
            if (result.status === 200) {
                setNews(result.data.data)
            }
        }
    }
}