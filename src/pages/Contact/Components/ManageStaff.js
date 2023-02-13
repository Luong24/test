import React, { Fragment, useEffect, useState } from 'react'
import { Input, Table } from 'antd';
import { ContactStore } from '../../../mobxStore/ContactStore';
const { Search } = Input;
export default function ManageStaff(props) {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const company = props.company;
    const contacts = ContactStore();

    useEffect(() => {
        contacts.getContact(page, keyword, company)
    }, [page, keyword, company])

    let lstContact = contacts.lstContact;
    const onSearch = async (value) => {
        setKeyword(value)
    };
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
            title: 'Mã nhân viên',
            dataIndex: 'ma_nv',
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
            <div className='w-1/4'>
                <Search placeholder="Tìm kiếm người dùng theo tên..." onSearch={onSearch} enterButton allowClear />
            </div>
            <div className='mt-4'>
                <Table
                    dataSource={lstContact?.data}
                    columns={columns}
                    pagination={{
                        defaultCurrent: 1,
                        defaultPageSize: 10,
                        total: `${lstContact?.total_count}`,
                        onChange: (page, pageSize) => {
                            contacts.getContact(page - 1, keyword)
                            setPage(page - 1)
                        }
                    }}
                />;
            </div>
        </Fragment>
    )
}
