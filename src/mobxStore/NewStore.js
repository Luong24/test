
import { manageNewService } from './../services/ManageNewService';
import { useState } from 'react';
import { message } from 'antd';



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
        async getDetailNew(code) {
            const result = await manageNewService.getDetail(code);
            if (result.status === 200) {
                setDetail(result.data)
            }
        },
        async deleteNew(code) {
            const result = await manageNewService.deleteNew(code);
            if (result.status === 200) {
                message.success('Xóa thành công!')
                this.getNew()
            }
        },
    }
}