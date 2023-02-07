import { Breadcrumb, Layout, Menu } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { AiFillSchedule, AiOutlineFileText, AiOutlineHome, AiOutlineSchedule, } from "react-icons/ai";
import { CreateAccountStore } from '../../mobxStore/AccountStore';
import { _home, _login, _new, _schedule } from '../../utils/config/configPath';
import { BsPersonCircle } from 'react-icons/bs';


const { Content, Sider } = Layout;

export default function HomeTemplate(props) {
    const { Component, ...restRoute } = props;
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const account = CreateAccountStore();

    useEffect(() => {
        account.getAccountAction()
    }, [])
    function uppercase(str) {
        var array1 = str.split(' ');
        var newarray1 = [];

        for (var x = 0; x < array1.length; x++) {
            newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
        }
        return newarray1.join(' ');
    }

    const operations = <div className='flex text-white'>
        <div className='flex items-center mx-8'>
            <BsPersonCircle className='mr-2 text-2xl' /> Đ/c <span className='mx-2 -mt-1 font-bold text-xl'>{account.lstAccount[0] ? uppercase(account.lstAccount[0]?.name_lowercase) : ''}</span>
        </div>
        <button onClick={() => {
            history.push(`${_login}`);
        }} className="self-center my-2 mr-8 px-4 py-3 border rounded-lg text-lg font-bold hover:bg-red-500">Đăng xuất</button>
    </div>
    const [collapsed, setCollapsed] = useState(false);



    return <Route {...restRoute} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }} >
                <Sider className='border-r z-50' style={{ backgroundColor: '#e4eaf2' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className='fixed top-0'>
                        <div className="w-full flex items-center justify-center my-4 cursor-pointer uppercase text-3xl font-bold" title='Trang chủ'>
                            <img className='h-14 mr-2' src='https://vimclogistics.com.vn/Data/images/logo/favicon.png' alt='' /> vimc
                        </div>
                        <div className='w-full'>
                            <Menu defaultSelectedKeys={['1']} mode="inline" style={{ backgroundColor: 'transparent' }}>
                                <Menu.Item key='1'>
                                    <NavLink className='flex items-center mt-2 text-base text-black nav-link focus:font-bold' to={`${_home}`} ><AiOutlineHome className='mr-2' /> Trang chủ</NavLink>
                                </Menu.Item>
                                <Menu.Item key='2' >
                                    <NavLink className='flex items-center mt-2 text-base text-black nav-link focus:font-bold' to={`${_schedule}`} ><AiOutlineSchedule className='mr-2' />Lịch cơ quan</NavLink>
                                </Menu.Item>
                                <Menu.Item key='3' >
                                    <NavLink className='flex items-center mt-2 text-base text-black nav-link focus:font-bold' to={`${_new}`}><AiOutlineFileText className='mr-2' />Thông báo chung</NavLink>
                                </Menu.Item>
                                <Menu.Item key='4'  >
                                    <NavLink className='flex items-center mt-2 text-base text-black nav-link focus:font-bold' to='/home'><AiFillSchedule className='mr-2' />Danh bạ</NavLink>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                </Sider>
                <Layout className="site-layout" style={{ backgroundColor: '#c0d5ef' }}>
                    <div className='border-b z-40 shadow-lg fixed top-0 left-0 right-0' style={{ backgroundColor: '#2c65ac' }}>
                        <div className='flex justify-end mt-1'>{operations}</div>
                    </div>

                    <div>
                        <Breadcrumb
                            style={{
                                margin: '16px 16px',
                            }}
                        >
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Lịch cơ quan</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Content style={{ margin: '0 16px', }}>
                        <div className='mt-16' style={{ padding: 24, minHeight: 360, }}>

                            <Component {...propsRoute} />

                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}
