import React, { Fragment, useEffect } from 'react'
import { NewStore } from '../../mobxStore/NewStore';
import { Dropdown, Menu, Popconfirm, Space, Upload, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineFile, AiOutlineMore, AiOutlineUpload } from 'react-icons/ai';
import { history } from '../../App';
import { _new, _update } from '../../utils/config/configPath';
import { DOMAIN, TOKEN } from '../../utils/settings/config';

export default function DetailNew(props) {
    let { code } = props.match.params;
    const news = NewStore();
    useEffect(() => {
        news.getDetailNew(code)
    }, [])

    const confirm = (e) => {
        // console.log(e);
        news.deleteNew(code)

    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    const menu = (
        <Menu>

            <Menu.Item key="0">
                <NavLink to={`${_new}${_update}/${code}`}>
                    <div className='flex items-center'>
                        <AiOutlineEdit className='text-blue-500 mr-2' />
                        <span className='text-blue-500'>Sửa thông tin</span>
                    </div>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <Popconfirm
                    title="Bạn có chắc muốn xóa tin này!"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Đồng ý"
                    cancelText="Không"
                >
                    <button className='w-full'>
                        <div className='flex items-center'>
                            <AiOutlineDelete className='text-red-500 mr-2' />
                            <span className='text-red-500'>Xóa</span>
                        </div>
                    </button>
                </Popconfirm>
            </Menu.Item>

        </Menu>
    );

    const getFile = (fileId, file_name) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}`
            },
        };
        fetch(`${DOMAIN}api/v1/upload/attachments/${fileId}`, options)
            .then(res => {
                res.blob().then(blob => {
                    console.log('first', blob)
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = `${file_name}`;
                    a.click();

                });

            })
            .catch(() => alert('Tải không thành công!'));
    };

    return (
        <Fragment>
            <div className='flex justify-end -mt-12 mb-4'>
                <Dropdown overlay={menu}
                    trigger={['click']}
                >
                    <NavLink to='' onClick={() => {
                        // setCode(item.id)
                    }}>
                        <Space>
                            <button className='w-8 h-8 bg-white rounded-full text-black flex justify-center items-center hover:shadow-lg hover:drop-shadow-lg hover:border hover:rounded-full ' ><AiOutlineMore className='text-2xl' /></button>
                        </Space>
                    </NavLink>
                </Dropdown>
            </div>
            <div className='-mt-10 flex items-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-white hover:text-blue-500' onClick={() => {
                    history.push(`${_new}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>Chi tiết thông báo</div>
            </div>
            <div className='bg-white rounded-md p-6 m-2'>
                <div className='border-b pb-4'>
                    <h1 className='text-xl'>
                        {news.lstDetail?.subject}
                    </h1>
                </div>
                <div dangerouslySetInnerHTML={{ __html: news.lstDetail?.content }} />

                <div className='flex'>
                    <h1>Tài liệu đính kèm:</h1>
                    <div>{news.lstDetail?.attachments ? <Fragment>
                        {news.lstDetail?.attachments.map(file => {
                            return <div className='mx-2 flex items-center text-blue-600'>
                                <AiOutlineFile />
                                <button className='ml-1 mr-3 hover:underline' title='Tải xuống'
                                    onClick={() =>
                                        getFile(
                                            file.file_id,
                                            file.file_name
                                        )
                                    }
                                >{file.file_name}</button>
                                <button className='px-1 rounded text-green-600 hover:bg-slate-100' title='Xem tài liệu' >
                                    <AiOutlineEye />
                                </button>
                            </div>
                        })}
                    </Fragment> : <i className='mx-2'>Không có tài liệu đính kèm</i>}</div>
                </div>
            </div>
        </Fragment>
    )
}
