import React, { Fragment, useEffect, useState } from 'react'
import { Input, Modal, Select, Switch, Table } from 'antd';
import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineFilter } from "react-icons/ai";
import { UserAccountStore } from '../../../mobxStore/UserAccountStore';
import { BsPlusCircle } from "react-icons/bs";
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';


const { Search } = Input;

export default function ManageUser() {
    const item = UserAccountStore();
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [recordUpdate, setRecordUpdate] = useState();
    useEffect(() => {
        item.getUserAccount(page, keyword);
        item.getDepartment();
    }, [page, keyword])
    let lstAccount = item.lstAccount;
    let lstDepartment = item.lstDepartment;
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
            title: 'Họ tên',
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
            title: 'Số ĐT',
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
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text, record, index) => {
                return <Switch checked={text}
                    onChange={(value) => {
                        item.updateStatusAccount(record.code, { status: value });
                    }}
                />
            }
        },
        {
            title: 'Công ty',
            render: (text, record, index) => {
                return <Fragment>
                    {record ? <span>{record.company.name}</span> : <i className='opacity-50'>Không rõ</i>}
                </Fragment>

            }
        },
        {
            title: 'Tác vụ',
            render: (text, record, index) => {
                return <Fragment>
                    <button className='flex items-center text-white border rounded px-4 py-1 bg-blue-900 hover:opacity-70 '
                        onClick={() => {
                            showModal2();
                            setRecordUpdate(record);
                        }}
                    >
                        <AiOutlineEdit className='mr-2' />
                        <span>Chỉnh sửa</span>
                    </button>
                </Fragment>
            }
        },
    ];

    const handleSapXep = (value) => {
        console.log(`selected ${value}`);
    };
    const handleThuTu = (value) => {
        console.log(`selected ${value}`);
    };
    const handleTrangThai = (value) => {
        console.log(`selected ${value}`);
    };
    const handlePhongBan = (value) => {
        item.searchPhongBan(value)
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    const handleOk2 = () => {
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };


    return (
        <Fragment>
            <div className='absolute top-24 right-10'>
                <button className='flex items-center border rounded px-4 py-1 text-white bg-blue-900' onClick={showModal}>
                    <BsPlusCircle className='mr-2' />
                    <span>Thêm mới người dùng</span>
                </button>
            </div>
            <Modal title="Thêm mới người dùng" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CreateModal lstDepartment={lstDepartment} />
            </Modal>
            <Modal title="Sửa thông tin người dùng" visible={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
                <UpdateModal lstDepartment={lstDepartment} record={recordUpdate} />
            </Modal>
            <div className='w-full flex justify-between'>
                <div className='w-1/4'>
                    <Search placeholder="Tìm kiếm theo tên hoặc username..." onSearch={onSearch} enterButton allowClear />

                </div>
                {hidden === true ? <button className='flex items-center border rounded border-blue-800 text-blue-800 px-4 py-1' onClick={() => {

                    setHidden(false);
                }}>
                    <AiOutlineFilter className='mr-2' />
                    <span>Tìm kiếm nâng cao</span>
                </button> : <button className='flex items-center border rounded border-blue-800 text-blue-800 px-4 py-1' onClick={() => {
                    item.getUserAccount(page, keyword);
                    setHidden(true);
                }}>
                    <AiOutlineCloseCircle className='mr-2' />
                    <span>Tắt tìm kiếm nâng cao</span>
                </button>}
            </div>
            <div hidden={hidden} className='grid grid-cols-4 my-4'>
                <div className='mr-2'>
                    <div>Sắp xếp theo</div>
                    <Select
                        className='w-full'
                        onChange={handleSapXep}
                        placeholder="Sắp xếp theo"
                        allowClear
                        options={[
                            {
                                value: 'jack',
                                label: 'Họ tên',
                            },
                            {
                                value: 'jack',
                                label: 'Tên đăng nhập',
                            },
                        ]}
                    />
                </div>
                <div className='mx-2'>
                    <div>Thứ tự</div>
                    <Select
                        className='w-full'
                        onChange={handleThuTu}
                        placeholder="Lựa chọn"
                        allowClear
                        options={[
                            {
                                value: 'jack',
                                label: 'Tăng dần',
                            },
                            {
                                value: 'jack',
                                label: 'Giảm dần',
                            },
                        ]}
                    />
                </div>
                <div className='mx-2'>
                    <div>Trạng thái</div>
                    <Select
                        className='w-full'
                        onChange={handleTrangThai}
                        placeholder="Trạng thái"
                        allowClear
                        options={[
                            {
                                value: 'jack',
                                label: 'Active',
                            },
                            {
                                value: 'jack',
                                label: 'Inactive',
                            },
                        ]}
                    />
                </div>
                <div className='ml-2'>
                    <div>Phòng ban</div>
                    <Select
                        showSearch
                        allowClear
                        className='w-full'
                        onChange={handlePhongBan}
                        placeholder="Phòng ban"
                    >
                        {lstDepartment?.map(item => {
                            return <Select.Option value={item.code}>
                                {item.name}
                            </Select.Option>
                        })}
                    </Select>
                </div>
            </div>
            <div className='mt-4'>
                <Table
                    dataSource={lstAccount?.data}
                    columns={columns}
                    pagination={{
                        defaultCurrent: 1,
                        defaultPageSize: 10,
                        total: `${lstAccount?.total_count}`,
                        onChange: (page, pageSize) => {
                            item.getUserAccount(page - 1, keyword)
                            setPage(page - 1)
                        }
                    }}
                />
            </div>
        </Fragment>
    )
}
