
import { manageNewService } from './../services/ManageNewService';
import { useState } from 'react';



export function NewStore() {
    const [news, setNews] = useState();
    const [detail, setDetail] = useState();
    return {
        lstNew: news,
        lstDetail: detail,
        async getNew() {
            const result = await manageNewService.getAllNew();
            if (result.status === 200) {
                setNews(result.data.data)
            }
        },
        async getDetailNew() {
            const result = await manageNewService.getDetail();
            console.log('result', result)
            // if (result.status === 200) {
            //     setDetail(result.data.data)
            // }
        }
    }
}