import React, { Fragment, useEffect, useState } from 'react'
import { ScheduleStore } from '../../mobxStore/ScheduleStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { DatePicker, TimePicker, TreeSelect } from 'antd';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN'
import { CreateAccountStore } from '../../mobxStore/AccountStore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AiOutlineArrowLeft, AiOutlineUpload } from 'react-icons/ai';
import { history } from '../../App';
import { _schedule } from '../../utils/config/configPath';

export default function UpdateSchedule(props) {
    let { code } = props.match.params;
    const detail = ScheduleStore();
    const user = CreateAccountStore();

    useEffect(() => {
        detail.getDetailSchedule(code)
    }, [])




    const [startDate, setStartDate] = useState(new Date());

    const onChangeDate = (date, dateString) => {
        setStartDate(moment(date).format())



    };
    const onChangeStart = (start, timeStart) => {

        formik.setFieldValue('start_at', moment(start._d).format())

    }



    const onChangeEnd = (end, timeEnd) => {
        formik.setFieldValue('end_at', moment(end._d).format())

    }

    //UPPERCASE

    function uppercase(str) {
        var array1 = str.split(' ');
        var newarray1 = [];

        for (var x = 0; x < array1.length; x++) {
            newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
        }
        return newarray1.join(' ');
    }


    // Tree

    const treeData = user.lstUser[0]?.map((item, index) => {
        return {
            title: item?.name,
            value: item?.code,
            children: item.users?.map(user => (
                {
                    title: `${uppercase(user.name_uppercase.toLowerCase())}`,
                    value: user.user_name
                }
            ))
        }
    }
    )

    const onChange = (newValue) => {

        // formik.setFieldValue('assignees', newValue)

    };

    //formik

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            assign_person_update: { new_items: [], remove_items: [] },
            start_at: detail.detailSchedule[0]?.start_at,
            end_at: detail.detailSchedule[0]?.end_at,
            file_ids: [],
            host: detail.detailSchedule[0]?.host,
            location: detail.detailSchedule[0]?.location,
            preparation: detail.detailSchedule[0]?.preparation,
            event_notice: detail.detailSchedule[0]?.event_notice,
            attenders: detail.detailSchedule[0]?.attenders,
            title: ''
        },
        validationSchema: Yup.object({
            // start_at: Yup.string()
            //     .required("Không được để trống !"),



        }),
        onSubmit: values => {

            detail.updateSchedule(code, values)
        }
    })
    return (
        <Fragment>
            <div className='-mt-10 flex items-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-white hover:text-blue-500' onClick={() => {
                    history.push(`${_schedule}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>Chi tiết sự kiện</div>
            </div>
            <div className='bg-white rounded-md mt-4 py-8'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid grid-cols-5'>
                        <div className='col-start-2 col-span-3'>
                            <div className='grid grid-cols-3'>
                                <div className='mx-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> Ngày thực hiện
                                    </div>
                                    <DatePicker locale={locale} style={{ width: '100%' }} name='start_at' placeholder='Chọn ngày thực hiện' onChange={onChangeDate} defaultValue={moment(startDate, "DD/MM/YYYY")} value={moment(formik.values.start_at)} format='DD/MM/YYYY' />
                                    {/* {formik.errors.start_at && formik.touched.start_at && (
                                    <p className='m-0 mt-1 text-red-600'>{formik.errors.start_at}</p>
                                )} */}

                                </div>
                                <div className='mx-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> Thời gian bắt đầu
                                    </div>
                                    <TimePicker locale={locale} style={{ width: '100%' }} placeholder='Bắt đầu' onChange={onChangeStart} defaultOpenValue={moment(startDate)} value={moment(formik.values.start_at)} format='HH:mm' />
                                </div>
                                <div className='mx-4'>
                                    <div className='flex'>
                                        Thời gian kết thúc
                                    </div>
                                    <TimePicker locale={locale} style={{ width: '100%' }} name='end_at' placeholder='Kết thúc' onChange={onChangeEnd} value={moment(formik.values.end_at)} format='HH:mm' />
                                </div>

                            </div>
                            <div className='mx-4'>
                                <div className='my-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> Chủ trì
                                    </div>
                                    <input type="text" name='host' onChange={formik.handleChange} value={formik.values.host} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chủ trì" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> Địa điểm
                                    </div>
                                    <input type="text" name='location' onChange={formik.handleChange} value={formik.values.location} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Địa điểm" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        Chuẩn bị
                                    </div>
                                    <input type="text" name='preparation' onChange={formik.handleChange} value={formik.values.preparation} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chuẩn bị" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        Nội dung sự kiện
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={formik.values.event_notice}
                                        name='event_notice'
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue('event_notice', data)
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
                                    <input type="text" name='attenders' onChange={formik.handleChange} value={formik.values.attenders} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="--Thành viên tham gia--" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        Thông báo
                                    </div>
                                    <TreeSelect
                                        name='assignees'
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                        // value={title}
                                        dropdownStyle={{
                                            minHeight: 100,
                                            overflow: 'auto',
                                        }}
                                        placeholder="--Chọn người nhận thông báo--"
                                        allowClear
                                        treeDefaultExpandAll

                                        onChange={onChange}
                                        treeData={treeData}
                                        treeCheckable={true}


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
            </div>


        </Fragment >
    )
}
