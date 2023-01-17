
import { baseServices } from "./baseServices";

class ManageUserService extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAccount = () => {
        return this.get(`api/v1/users/current-user`)
    }
    getUsers = () => {
        return this.get(`api/v1/departments/users?company_code=CPN7451091748209`)
    }
}

export const manageUserService = new ManageUserService()