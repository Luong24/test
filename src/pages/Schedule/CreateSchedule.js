import { DatePicker, Select, TimePicker } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineUpload } from 'react-icons/ai'
import { history } from './../../App';
import { _schedule } from '../../utils/config/configPath';
import { CreateAccountStore } from '../../mobxStore/AccountStore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextArea from 'antd/lib/input/TextArea';

export default function CreateSchedule() {
    const user = CreateAccountStore();
    const [startDate, setStartDate] = useState(new Date());

    const onChangeDate = (date, dateString) => {
        setStartDate(dateString)
    };
    const onChangeStart = (start, timeStart) => {
        console.log('first', timeStart)
    }
    const onChangeEnd = (end, timeEnd) => {
        console.log('first', timeEnd)
    }

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    useEffect(() => {
        user.getUsersAction()
    }, [])
    console.log('first', user.lstUser[0])
    return (
        <Fragment>
            <div className='-mt-4 flex items-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-blue-300 hover:text-white' onClick={() => {
                    history.push(`${_schedule}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>Tạo sự kiện mới</div>
            </div>

            <form>
                <div className='grid grid-cols-5'>
                    <div className='col-start-2 col-span-3'>
                        <div className='grid grid-cols-3'>
                            <div className='mx-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Ngày thực hiện
                                </div>
                                <DatePicker style={{ width: '100%' }} placeholder='Chọn ngày thực hiện' onChange={onChangeDate} defaultValue={moment(startDate)} format='DD/MM/YYYY' />
                            </div>
                            <div className='mx-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Thời gian bắt đầu
                                </div>
                                <TimePicker style={{ width: '100%' }} placeholder='Bắt đầu' onChange={onChangeStart} format='HH:mm' />
                            </div>
                            <div className='mx-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Thời gian kết thúc
                                </div>
                                <TimePicker style={{ width: '100%' }} placeholder='Kết thúc' onChange={onChangeEnd} format='HH:mm' />
                            </div>

                        </div>
                        <div className='mx-4'>
                            <div className='my-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Chủ trì
                                </div>
                                <input type="text" name='Username' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chủ trì" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Địa điểm
                                </div>
                                <input type="text" name='Username' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Địa điểm" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Chuẩn bị
                                </div>
                                <input type="text" name='Username' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chuẩn bị" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Nội dung sự kiện
                                </div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Tài liệu đính kèm
                                </div>
                                <button className='border rounded-md flex items-center px-2 py-1 hover:border-blue-300 '>
                                    <AiOutlineUpload className='mx-2' />Tài liệu đính kèm
                                </button>
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Thành viên tham gia
                                </div>
                                <input type="text" name='Username' className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="--Thành viên tham gia--" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Thông báo
                                </div>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="--Chọn người nhận thông báo--"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={user.lstUser[0]?.map(item => (
                                        {
                                            value: item.code,
                                            label: item.name,
                                        }
                                    ))}
                                />
                            </div>
                        </div>
                        <div className='mx-4 text-end'>
                            <button type='submit' className='border rounded text-white px-2 py-1' style={{ backgroundColor: '#2c65ac' }}>
                                Tạo mới sự kiện
                            </button>
                        </div>
                    </div>
                </div>

            </form>

        </Fragment >
    )
}
