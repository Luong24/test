import { manageContactService } from "../services/ManageContactService"
import { useState } from 'react';




export function ContactStore() {
    const [contact, setContact] = useState();
    const [company, setCompany] = useState();
    const [companies, setCompanies] = useState();
    const [department, setDepartment] = useState();

    return {
        lstContact: contact,
        lstCompany: company,
        lstCompanies: companies,
        lstdepartment: department,
        async getContact(page, keyword, company) {
            const result = await manageContactService.getAllContact(page, keyword, company);
            if (result.status === 200) {
                setContact(result.data)
            }
        },
        async getCompany(company) {
            const result = await manageContactService.getAllCompany(company);
            if (result.status === 200) {
                setCompany(result.data)
            }
        },
        async getCompanies() {
            const result = await manageContactService.getAllCompanies();
            if (result.status === 200) {
                setCompanies(result.data)
            }
        },
        async getDepartment(page, department, company) {
            const result = await manageContactService.getAllDepartment(page, department, company);
            if (result.status === 200) {
                setDepartment(result.data)
            }
        },

    }
}
