import React, { Fragment, useEffect, useState } from 'react'
import { Layout, Menu, Table } from 'antd';
import { ContactStore } from '../../../mobxStore/ContactStore';
const { Content, Sider } = Layout;
export default function ManageDepartment(props) {
    const company = props.company;
    const [department, setDepartment] = useState('HDQT');
    const [page, setPage] = useState('0');
    const item = ContactStore();
    useEffect(() => {
        item.getCompany(company);
        item.getDepartment(page, department, company)
    }, [page, department, company])
    let lstCompany = item.lstCompany;
    let dataSource = item.lstdepartment;

    // console.log('code', department)

    function uppercase(str) {
        var array1 = str.split(' ');
        var newarray1 = [];

        for (var x = 0; x < array1.length; x++) {
            newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
        }
        return newarray1.join(' ');
    }

    const columns = [
        {
            title: 'Thông tin',
            dataIndex: 'name_lowercase',
            render: (text, record, index) => {
                return <Fragment>
                    {text ? <div className='flex items-center'>
                        <div className='h-8 w-8 mr-4 bg-blue-500 rounded-full flex items-center justify-center text-white'>{uppercase(text).slice(0, 1)}</div>
                        <b>{uppercase(text)}</b>
                    </div> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>
            }
        },
        {
            title: 'ID',
            dataIndex: 'username',
            render: (text, record, index) => {
                return <Fragment>
                    {text ? <span>{text}</span> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, record, index) => {
                return <Fragment>
                    {text ? <span>{text}</span> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>
            }
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            render: (text, record, index) => {
                return <Fragment>
                    {text ? <b>{text}</b> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>
            }
        },
        {
            title: 'Số máy nội bộ',
            dataIndex: 'home_phone',
            render: (text, record, index) => {
                return <Fragment>
                    {text ? <b>{text}</b> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>
            }
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            render: (text, record, index) => {
                return <Fragment>
                    {text ? <span>{text}</span> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>
            }
        },
        {
            title: 'Chức vụ',
            render: (text, record, index) => {
                // console.log(item)
                return <Fragment>
                    {record ? <span>{record.position.name}</span> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>

            }
        },
        {
            title: 'Phòng ban',
            render: (text, record, index) => {
                return <Fragment>
                    {record ? <span>{record.department.name}</span> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>
            }
        },
    ];
    return (
        <Fragment>
            <Layout>
                <Sider className='border-r ' style={{
                    backgroundColor: 'white',
                    overflow: 'auto',
                    position: 'sticky',
                }} >
                    <div className='w-full'>
                        <Menu defaultSelectedKeys={['0']} mode="inline">
                            {lstCompany?.map((items, index) => {
                                return <Menu.Item key={index}>
                                    <button className='w-full flex items-center text-black nav-link focus:text-blue-500' onClick={() => setDepartment(items.code)}>{items.name}</button>
                                </Menu.Item>
                            })}
                        </Menu>
                    </div>
                </Sider>
                <Layout className="site-layout">


                    <Content>
                        <div className='bg-white h-full p-4'>
                            <Table
                                dataSource={dataSource?.data}
                                columns={columns}
                                pagination={{
                                    defaultCurrent: 1,
                                    defaultPageSize: 10,
                                    total: `${dataSource?.total_count}`,
                                    onChange: (page, pageSize) => {
                                        item.getDepartment(page - 1, department, company)
                                        setPage(page - 1)
                                    }
                                }}
                            />;
                        </div>
                    </Content>
                </Layout>
            </Layout>

        </Fragment>
    )
}
