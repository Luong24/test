import { manageUseAccountService } from "../services/ManageUserAccountService"
import { useState } from 'react';
import { message } from 'antd';




export function UserAccountStore() {
    const [account, setAccount] = useState();
    const [department, setDepartment] = useState();


    return {
        lstAccount: account,
        lstDepartment: department,
        async getUserAccount(page, keyword) {
            const result = await manageUseAccountService.getAllAccount(page, keyword);
            if (result.status === 200) {
                setAccount(result.data)
            }
        },
        async updateStatusAccount(code, status) {
            const result = await manageUseAccountService.updateStatusAccount(code, status);
            if (result.status === 200) {
                if (status.status === true) {
                    await message.success("Đã kích hoạt người dùng!")
                } else {
                    await message.success("Đã tạm dừng người dùng!")
                }
                window.location.reload();
            }
        },
        async getDepartment() {
            const result = await manageUseAccountService.getAllDepartment();
            if (result.status === 200) {
                setDepartment(result.data)
            }
        },
        async searchPhongBan(code) {
            const result = await manageUseAccountService.getPhongBan(code);
            if (result.status === 200) {
                setAccount(result.data)
            }
        }
    }
}