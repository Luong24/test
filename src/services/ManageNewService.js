import { baseServices } from "./baseServices";


class ManageNewService extends baseServices {


    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAllNew = (page, size) => {
        return this.get(`api/v1/news?page=${page}&size=${size}`)
    }
    getDetail = (code) => {
        return this.get(`api/v1/news/${code}`)
    }

    createNew = (data) => {
        return this.post(`api/v1/news`, data)
    }

    updateNew = (data) => {
        return this.patch(`api/v1/news`, data)
    }

    deleteNew = (code) => {
        return this.delete(`api/v1/news/${code}`)
    }
}


export const manageNewService = new ManageNewService();