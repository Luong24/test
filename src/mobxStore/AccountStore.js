import { manageAccountService } from "../services/ManageAccountService";
import { manageUserService } from "../services/ManageUserService";
import { TOKEN } from "../utils/settings/config";
export function createAccountStore() {
    // const navigate = useNavigate();

    return {

        lstAccount: [],
        async getToken(data) {
            const result = await manageAccountService.postToken(data);
            if (result.status === 200) {
                sessionStorage.setItem(TOKEN, JSON.stringify(result.data.access_token))
            }
        },
        async getAccountAction() {
            const result = await manageUserService.getAccount();
            this.lstAccount.append(result)
            // console.log('result', result);
        }
    }
}