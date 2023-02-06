import { baseServices } from "./baseServices";


class ManageNewService extends baseServices {


    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAllNew = () => {
        return this.get(`api/v1/news?page=0&size=10`)
    }
    getDetail = (code) => {
        return this.get(`api/v1/news/${code}`)
    }

    createNew = (data) => {
        return this.post(`api/v1/news`, data)
    }

    deleteNew = (code) => {
        return this.delete(`api/v1/news/${code}`)
    }
}


export const manageNewService = new ManageNewService();