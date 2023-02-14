import { Tabs } from 'antd'
import React, { Fragment } from 'react'
import ManageUser from './Components/ManageUser'

export default function ManageAccount() {
    return (
        <Fragment>

            <div className='bg-white p-4 rounded-md '>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Tài khoản" key="1">
                        <ManageUser />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Phần mềm" key="2">
                        {/* <ManageDepartment company={company} /> */}
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Fragment>
    )
}
