

import { accoutService } from "./accountService";

class ManageUserService extends accoutService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAccount = () => {
        return this.get(`api/v1/users/current-user`)
    }
}

export const manageUserService = new ManageUserService()