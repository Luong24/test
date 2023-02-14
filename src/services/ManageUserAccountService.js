
import { baseServices } from './baseServices';


class ManageUserAccountService extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getAllAccount = (page, keyword) => {
        return this.get(`api/v1/users?page=${page}&size=10&keyword=${keyword}&has_admin=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%2526DVHH,BTTKH,BPC%2526QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=CPN7451091748209`)
    }
    updateStatusAccount = (code, status) => {
        return this.patch(`api/v1/users/${code}`, status)
    }
    getAllDepartment = () => {
        return this.get(`api/v1/departments/CPN7451091748209`)
    }
    getPhongBan = (code) => {
        return this.get(`api/v1/users?page=0&size=10&keyword=&department_code=${code}&has_admin=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%2526DVHH,BTTKH,BPC%2526QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=CPN7451091748209`)
    }
}

export const manageUseAccountService = new ManageUserAccountService();