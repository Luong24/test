import { baseServices } from "./baseServices";



class ManageContactService extends baseServices {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    getAllContact = (page, keyword, company) => {
        return this.get(`api/v1/users?page=${page}&size=10&keyword=${keyword}&status=true&sort=departmentCode,desc,HDQT,BDH,BTCNS,BTCKT,BTKTH,BKTKTNB,BVTB,BCB%2526DVHH,BTTKH,BPC%2526QTRR,BTGTT,VPCQTCT,BCNTT,CDTCT&company_code=${company}`)
    }

    getAllCompany = (company) => {
        return this.get(`api/v1/departments/getAll?company_code=${company}`)
    }

    getAllCompanies = () => {
        return this.get('api/v1/companies?status=true')
    }

    getAllDepartment = (page, department, company) => {
        return this.get(`api/v1/users?page=${page}&size=10&keyword=&department_code=${department}&status=true&company_code=${company}`)
    }

}

export const manageContactService = new ManageContactService();
