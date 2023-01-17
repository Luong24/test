import { history } from "../App";
import { manageAccountService } from "../services/ManageAccountService";
import { manageUserService } from "../services/ManageUserService";
import { TOKEN } from "../utils/settings/config";
import { useState } from 'react';
export function CreateAccountStore() {
    const [account, setAccount] = useState();
    return {
        lstAccount: [account],
        async getToken(data) {
            const result = await manageAccountService.postToken(data);
            if (result.status === 200) {
                sessionStorage.setItem(TOKEN, JSON.stringify(result.data.access_token))
                history.push('/home')
            }
        },
        async getAccountAction() {
            const result = await manageUserService.getAccount();
            if (result.status === 200) {
                setAccount(result.data)
            }
        },
    }
}