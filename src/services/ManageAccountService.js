

import { accoutService } from "./accountService";

class ManageAccountService extends accoutService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    postToken = (data) => {
        return this.post(`auth/realms/VIMC/protocol/openid-connect/token`, data)
    }

    // getAccount = () => {
    //     return this.get(`api/v1/users/current-user`)
    // }
}

export const manageAccountService = new ManageAccountService();
