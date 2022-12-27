import { Layout, Menu } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';


const { Content, Sider } = Layout;

export default function HomeTemplate(props) {
    const { Component, ...restRoute } = props;
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const operations = <Fragment>
        <div className='flex items-center mx-8'>
            Đ/c <span className='mx-2 -mt-1 font-bold text-xl'>Admin</span>
        </div>
        <button onClick={() => {
            history.push('/login');
        }} className="self-center my-2 mr-8 px-4 py-3 border rounded-lg text-lg font-bold hover:text-white hover:bg-red-500">Đăng xuất</button>
    </Fragment>
    return <Route {...restRoute} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider className='border-r' style={{ backgroundColor: '#c0d5ef' }}>
                    <div className="w-full flex items-center justify-center my-4 cursor-pointer uppercase text-3xl font-bold" title='Trang chủ'>
                        <img className='h-14 mr-2' src='https://vimclogistics.com.vn/Data/images/logo/favicon.png' alt='' /> vimc
                    </div>
                    <Menu defaultSelectedKeys={['1']} mode="inline" style={{ backgroundColor: 'transparent' }}>
                        <Menu.Item key='1' >
                            <NavLink className='text-black nav-link focus:font-bold' to='/home' >Trang chủ</NavLink>
                        </Menu.Item>
                        <Menu.Item key='2' >
                            <NavLink className='text-black nav-link focus:font-bold' to='/home' >Lịch cơ quan</NavLink>
                        </Menu.Item>
                        <Menu.Item key='3' >
                            <NavLink className='text-black nav-link focus:font-bold' to='/home'>Thông báo chung</NavLink>
                        </Menu.Item>
                        <Menu.Item key='4'  >
                            <NavLink className='text-black nav-link focus:font-bold' to='/home'>Danh bạ</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <div className='bg-white border-b shadow-lg'>
                        <div className='flex justify-end mt-1'>{operations}</div>
                    </div>
                    <Content style={{ margin: '0 16px', }}>
                        <div style={{ padding: 24, minHeight: 360, }}>

                            <Component {...propsRoute} />

                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}
