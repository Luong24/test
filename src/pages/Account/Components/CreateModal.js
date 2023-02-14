import { Select } from 'antd'
import React from 'react'
import { UserAccountStore } from '../../../mobxStore/UserAccountStore';

export default function CreateModal(props) {
    const item = UserAccountStore();
    let lstDepartment = props.lstDepartment;
    const handlePhongBan = (value) => {
        item.searchPhongBan(value)
    };
    return (
        <div>
            <div className='grid grid-cols-2 my-2'>
                <div className='mr-2'>
                    <span><span className='text-red-500 mr-1'>*</span>Tên đăng nhập</span>
                    <input type="text" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Tên đăng nhập" />
                </div>
                <div className='ml-2'>
                    <span><span className='text-red-500 mr-1'>*</span>Mật khẩu</span>
                    <input type="password" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Mật khẩu" />
                </div>
            </div>
            <div className='my-2'>
                <span><span className='text-red-500 mr-1'>*</span>Phòng ban</span>
                <Select
                    className='w-full'
                    onChange={handlePhongBan}
                    placeholder="Phòng ban"
                    showSearch
                    allowClear

                >
                    {lstDepartment?.map(item => {
                        return <Select.Option value={item.code}>
                            {item.name}
                        </Select.Option>
                    })}
                </Select>
            </div>
            <div className='my-2'>
                <span><span className='text-red-500 mr-1'>*</span>Họ tên</span>
                <input type="text" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Họ tên" />
            </div>
            <div className='my-2'>
                <span><span className='text-red-500 mr-1'>*</span>Mã nhân viên</span>
                <input type="text" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Mã nhân viên" />
            </div>
            <div className='my-2'>
                <span><span className='text-red-500 mr-1'>*</span>Email</span>
                <input type="text" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Email" />
            </div>
            <div className='my-2'>
                <span><span className='text-red-500 mr-1'>*</span>Giới tính</span>
                <input type="text" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Giới tính" />
            </div>
            <div className='my-2'>
                <span><span className='text-red-500 mr-1'>*</span>Điện thoại</span>
                <input type="text" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Điện thoại" />
            </div>
            <div className='my-2'>
                <span><span className='text-red-500 mr-1'>*</span>Chức danh</span>
                <input type="text" name='' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chức danh" />
            </div>
        </div>
    )
}
