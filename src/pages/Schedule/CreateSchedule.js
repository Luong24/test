import { DatePicker, Select, TimePicker } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineUpload } from 'react-icons/ai'
import { history } from './../../App';
import { _schedule } from '../../utils/config/configPath';
import { CreateAccountStore } from '../../mobxStore/AccountStore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN'

export default function CreateSchedule() {
    const user = CreateAccountStore();
    const [startDate, setStartDate] = useState(new Date());
    const [timeStart, setTimeStart] = useState();
    const [assignees, setAssignees] = useState();
    const onChangeDate = (date, dateString) => {
        setStartDate(dateString)
        formik.setFieldValue('start_at', dateString)
    };
    const onChangeStart = (start, timeStart) => {
        setTimeStart(timeStart)
    }
    console.log('first', assignees)

    const onChangeEnd = (end, timeEnd) => {
        // console.log('first', timeEnd)
        formik.setFieldValue('end_at', timeEnd)

    }

    const onChange = (value) => {
        // eslint-disable-next-line no-lone-blocks
        {
            user.lstUser[0]?.map((item, index) => {

                return (
                    <Fragment>{item.code === value ? <div>{setAssignees(item.users)}</div> : ''}</Fragment>
                )
            }
            )
        }
        formik.setFieldValue('assignees', value)
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    useEffect(() => {
        user.getUsersAction()
    }, [])
    // console.log('ok', user.lstUser)
    const formik = useFormik({
        initialValues: {
            start_at: `${moment(startDate).format('DD/MM/YYYY')}  ${timeStart}`,
            end_at: '',
            host: '',
            location: '',
            preparation: '',
            event_notice: '',
            attenders: '',
            assignees: [],
            last_edit_by: ''
        },
        validationSchema: Yup.object({
            // start_at: Yup.string()
            //     .required("Không được để trống !"),

            // Password: Yup.string()
            //     .min(6, "Tối thiểu 6 kí tự")
            //     .required("Không được trống !"),

            // Role: Yup.string()
            //     .required("Không được trống !"),

            // Address: Yup.string()
            //     .required("Không được trống !"),

            // PhoneNumber: Yup.string()
            //     .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
            //         message: "Số điện thoại chưa đúng",
            //         excludeEmptyString: false,
            //     })
            //     .required("Không được trống !"),

        }),
        onSubmit: values => {
            console.log('first', values)
        }
    })
    return (
        <Fragment>
            <div className='-mt-4 flex items-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-blue-300 hover:text-white' onClick={() => {
                    history.push(`${_schedule}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>Tạo sự kiện mới</div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-5'>
                    <div className='col-start-2 col-span-3'>
                        <div className='grid grid-cols-3'>
                            <div className='mx-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Ngày thực hiện
                                </div>
                                <DatePicker locale={locale} style={{ width: '100%' }} name='start_at' placeholder='Chọn ngày thực hiện' onChange={onChangeDate} defaultValue={moment(startDate)} format='DD/MM/YYYY' />
                                {/* {formik.errors.start_at && formik.touched.start_at && (
                                    <p className='m-0 mt-1 text-red-600'>{formik.errors.start_at}</p>
                                )} */}

                            </div>
                            <div className='mx-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Thời gian bắt đầu
                                </div>
                                <TimePicker locale={locale} style={{ width: '100%' }} placeholder='Bắt đầu' onChange={onChangeStart} format='HH:mm' />
                            </div>
                            <div className='mx-4'>
                                <div className='flex'>
                                    Thời gian kết thúc
                                </div>
                                <TimePicker locale={locale} style={{ width: '100%' }} name='end_at' placeholder='Kết thúc' onChange={onChangeEnd} format='HH:mm' />
                            </div>

                        </div>
                        <div className='mx-4'>
                            <div className='my-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Chủ trì
                                </div>
                                <input type="text" name='host' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chủ trì" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    <div className='text-red-500 mt-1 mr-1'>*</div> Địa điểm
                                </div>
                                <input type="text" name='location' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Địa điểm" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Chuẩn bị
                                </div>
                                <input type="text" name='preparation' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chuẩn bị" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Nội dung sự kiện
                                </div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                    name='event_notice'
                                    // onReady={editor => {
                                    //     // You can store the "editor" and use when it is needed.
                                    //     console.log('Editor is ready to use!', editor);
                                    // }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        formik.setFieldValue('event_notice', data)
                                    }}
                                // onBlur={(event, editor) => {
                                //     console.log('Blur.', editor);
                                // }}
                                // onFocus={(event, editor) => {
                                //     console.log('Focus.', editor);
                                // }}
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
                                <input type="text" name='attenders' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="--Thành viên tham gia--" />
                            </div>
                            <div className='my-4'>
                                <div className='flex'>
                                    Thông báo
                                </div>
                                <Select
                                    name='assignees'
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
