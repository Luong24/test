import React, { Fragment, useEffect, useState } from 'react'
import { NewStore } from '../../mobxStore/NewStore';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineFile, AiOutlineMore } from 'react-icons/ai';
import { Dropdown, Menu, Popconfirm, Space, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { _create, _new, _update, _view } from '../../utils/config/configPath';
import { history } from '../../App';
import { DOMAIN, TOKEN } from '../../utils/settings/config';
import InfiniteScroll from 'react-infinite-scroll-component'


export default function ManageNew() {
    const news = NewStore();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [dis, setDis] = useState(false);
    useEffect(() => {
        news.getNew(page, size)
    }, [])

    const [code, setCode] = useState();

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
                <NavLink to={`${_new}${_view}/${code}`} >
                    <div className='flex items-center'>
                        <AiOutlineEye className='text-blue-500 mr-2' />
                        <span className='text-blue-500'>Xem chi tiết</span>
                    </div>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink to={`${_new}${_update}/${code}`}>
                    <div className='flex items-center'>
                        <AiOutlineEdit className='text-blue-500 mr-2' />
                        <span className='text-blue-500'>Sửa thông tin</span>
                    </div>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
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

    const renderNew = () => {
        return news.lstNew?.map((item, index) => {
            return <Fragment>

                <div className='bg-white rounded-md p-6 m-2' style={{ width: '48%' }} key={index}>
                    <div className='flex justify-between border-b pb-4'>
                        <h1 className='text-xl'>{item.subject}</h1>

                        <Dropdown overlay={menu}
                            trigger={['click']}
                        >
                            <NavLink to='' onClick={() => {
                                setCode(item.id)
                            }}>
                                <Space>
                                    <button className='w-8 h-8 text-black flex justify-center bg-white items-center hover:border hover:rounded-full ' ><AiOutlineMore className='text-2xl' /></button>
                                </Space>
                            </NavLink>
                        </Dropdown>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: item.content }}>
                    </div>
                    <div className='flex'>
                        <h1>Tài liệu đính kèm:</h1>
                        <p>{item.attachments ? <Fragment>
                            {item.attachments.map(file => {
                                return <div className='mx-2 flex items-center text-blue-600'>
                                    <AiOutlineFile />
                                    <button className='ml-1 mr-3 hover:underline' title='Tải xuống' onClick={() => {
                                        getFile(
                                            file.file_id,
                                            file.file_name
                                        )
                                    }}>{file.file_name}</button>
                                    <button className='px-1 rounded text-green-600 hover:bg-slate-100' title='Xem tài liệu' >
                                        <AiOutlineEye />
                                    </button>
                                </div>
                            })}
                        </Fragment> : <i className='mx-2'>Không có tài liệu đính kèm</i>}</p>
                    </div>
                </div>
            </Fragment>

        })
    }
    const [hasMore, setHasMore] = useState(true)
    console.log('size', news.lstNew?.length)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSize(size + 10)
    //     }, 500)
    //     // news.getNew(page, size + 10)
    // }, [])

    return (
        <Fragment>
            <div className='text-end mr-12 -mt-12'>
                <button className='border px-4 py-2 text-white bg-blue-800 opacity-80 hover:opacity-50' onClick={() => {
                    history.push(`${_new}${_create}`)
                }}>
                    Đăng thông báo
                </button>
            </div>
            <InfiniteScroll
                dataLength={10}
                next={() => news.getNew(page, size)}
                hasMore={hasMore}
            // loader={<h4>Loading...</h4>}
            // endMessage={
            //     <p style={{ textAlign: 'center' }}>
            //         <b>Yay! You have seen it all</b>
            //     </p>
            // }
            >
                <div className='flex flex-wrap'>
                    {renderNew()}
                </div>
            </InfiniteScroll>

            <div className='text-center mr-8'>
                <button className='border py-2 px-4 bg-white rounded-full' disabled={dis} onClick={
                    () => {
                        // setPage(page + 1)
                        setSize(size + 10)
                        if (news.lstNew?.length >= size) {
                            // setDis(false)
                            news.getNew(page, size + 10)
                        } else {
                            alert('Hết rồi!')
                            setDis(true)
                        }
                    }
                }>Load More</button>
            </div>
        </Fragment>
    )
}
