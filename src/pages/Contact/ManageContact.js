import React, { Fragment, useEffect, useState } from 'react'
import { Select, Tabs } from 'antd';
import ManageStaff from './Components/ManageStaff';
import ManageDepartment from './Components/ManageDepartment';
import { ContactStore } from '../../mobxStore/ContactStore';


export default function ManageContact() {
    const [company, setCompany] = useState('CPN7451091748209');
    // console.log('company', company)
    const handleChange = (value) => {
        // console.log(`selected ${value}`);
        setCompany(value)
    };
    const item = ContactStore();
    useEffect(() => {
        item.getCompanies()
    }, [])
    let lstCompanies = item.lstCompanies;

    return (
        <Fragment>
            <div className='flex justify-end'>
                <div className='mb-2 -mt-8'>
                    <Select
                        style={{
                            width: 200,
                        }}
                        onChange={handleChange}
                        defaultValue="Tổng công ty Hàng hải Việt Nam"
                    >
                        {lstCompanies?.map(item => {
                            return <Select.Option value={item.code} >{item.name}</Select.Option>
                        })}
                    </Select>
                </div>
            </div>
            <div className='bg-white p-4 rounded-md '>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Nhân viên" key="1">
                        <ManageStaff company={company} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Phòng ban" key="2">
                        <ManageDepartment company={company} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Fragment>
    )
}
