
import { manageNewService } from './../services/ManageNewService';
import { useState } from 'react';
import { message } from 'antd';
import { history } from '../App';
import { _new } from '../utils/config/configPath';



export function NewStore() {
    const [news, setNews] = useState();
    const [detail, setDetail] = useState();
    return {
        lstNew: news,
        lstDetail: detail,
        async getNew(page, size) {
            const result = await manageNewService.getAllNew(page, size);
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
        async createNew(data) {
            const result = await manageNewService.createNew(data);
            if (result.status === 200) {
                message.success('Thêm mới thành công!')
                history.push(`${_new}`)
            }
        },
        async updateNew(data) {
            const result = await manageNewService.updateNew(data);
            if (result.status === 200) {
                message.success('Cập nhật thành công!')
                history.push(`${_new}`)
            }
        },
        async deleteNew(code) {
            const result = await manageNewService.deleteNew(code);
            if (result.status === 200) {
                message.success('Xóa thành công!')
                history.push(`${_new}`)
                this.getNew()
            }
        },
    }
}