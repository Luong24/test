import { baseServices } from "./baseServices";


class ManageNewService extends baseServices {


    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAllNew = () => {
        return this.get(`api/v1/news?page=0&size=10`)
    }
    getDetail = () => {
        return this.get(`api/v1/news/122`)
    }
}


export const manageNewService = new ManageNewService();