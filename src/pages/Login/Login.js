import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react'
import { history } from '../../App';

export default function Login() {
    const onFinish = (values) => {
        console.log('Success:', values);
        history.push('/home')
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='w-full h-screen flex items-center justify-center' style={{ backgroundImage: 'url(https://vcdn1-kinhdoanh.vnecdn.net/2020/10/01/945-1601526091-3216-1601541637.png?w=0&h=0&q=100&dpr=2&fit=crop&s=ibewBXrPq1du7IkyzQaj6w)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', opacity: 2 }}>
            <div className='w-1/3 px-4 pt-12 rounded-md' style={{ background: 'linear-gradient(to right, #7A7FBA, #11C37C)' }}>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tài khoản"
                        name="account"
                        rules={[
                            {
                                required: true,
                                message: 'Tài khoản không được để trống!',
                            },
                        ]}
                    >
                        <Input placeholder='Nhập tài khoản....' />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được để trống!',
                            },
                        ]}
                    >
                        <Input.Password placeholder='Nhập mật khẩu....' />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type='primary' htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
