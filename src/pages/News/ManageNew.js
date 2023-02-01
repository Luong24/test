import React, { useEffect } from 'react'
import { NewStore } from '../../mobxStore/NewStore';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineMore } from 'react-icons/ai';
import { Dropdown, Menu, Space } from 'antd';
import { NavLink } from 'react-router-dom';

export default function ManageNew() {
    const news = NewStore();

    useEffect(() => {
        news.getNew()
    }, [])

    console.log('first', news.lstNew)

    const stringToHTML = (str) => {
        var dom = document.createElement("div");
        dom.innerHTML = str;
        return dom;
    };

    const action = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <NavLink to='' className='flex items-center'>
                            <AiOutlineEye className='text-blue-500 mr-2' />
                            <span className='text-blue-500'>Xem chi tiết</span>
                        </NavLink>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <NavLink to='' className='flex items-center'>
                            <AiOutlineEdit className='text-blue-500 mr-2' />
                            <span className='text-blue-500'>Sửa thông tin</span>
                        </NavLink>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <NavLink to='' className='flex items-center'>
                            <AiOutlineDelete className='text-red-500 mr-2' />
                            <span className='text-red-500'>Xóa</span>
                        </NavLink>
                    ),
                },
            ]}
        />
    );

    const renderNew = () => {
        return news.lstNew?.map((item, index) => {
            return <div className='bg-white rounded-md p-6 m-2' style={{ width: '48%' }} key={index}>
                <div className='flex justify-between border-b pb-4'>
                    <h1 className='text-xl'>{item.subject}</h1>

                    <Dropdown overlay={action}
                        trigger={['click']}
                    >
                        {/* <NavLink to='' onClick={(e) => e.preventDefault()}> */}
                        <Space>
                            <button className='w-8 h-8 text-black flex justify-center bg-white items-center hover:border hover:rounded-full ' onClick={() => {

                            }}><AiOutlineMore className='text-2xl' /></button>
                        </Space>
                        {/* </NavLink> */}
                    </Dropdown>
                </div>
                <div>
                    <p>{stringToHTML(item.content).textContent}</p>
                    <br />
                </div>
                <div>
                    <h1>Tài liệu đính kèm:</h1>
                </div>
            </div>
        })
    }


    return (
        <div className='flex flex-wrap'>
            {renderNew()}
        </div>
    )
}
