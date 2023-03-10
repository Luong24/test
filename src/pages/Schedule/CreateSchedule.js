import { DatePicker, TimePicker, TreeSelect, Upload, message } from 'antd';
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
import { ScheduleStore } from '../../mobxStore/ScheduleStore';


export default function CreateSchedule() {

    useEffect(() => {
        user.getUsersAction()
    }, [])

    const user = CreateAccountStore();
    // console.log('first', user.lstUser[0])
    const schedule = ScheduleStore();

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
                    value: user.user_name,
                }
            ))
        }
    }
    )
    const onChange = (newValue) => {

        // formik.setFieldValue('assignees', newValue)

    };

    //file

    const props = {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                let reader = new FileReader();
                reader.onload = (e) => {
                    // console.log(e.target.result);
                }
                reader.readAsText(info.file.originFileObj);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} t???i l??n th??nh c??ng!`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} t???i l??n th???t b???i!`);
            }
        },
    };





    //formik

    const formik = useFormik({
        initialValues: {
            start_at: '',
            end_at: '',
            file_ids: [],
            host: '',
            location: '',
            preparation: '',
            event_notice: '',
            attenders: '',
            // assignees: [],
            title: ''

        },
        validationSchema: Yup.object({
            // start_at: Yup.string()
            //     .required("Kh??ng ???????c ????? tr???ng !"),

        }),
        onSubmit: values => {
            schedule.createSchedule(values)
        }
    })
    return (
        <Fragment>
            <div className='-mt-10 flex items-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-white hover:text-blue-500' onClick={() => {
                    history.push(`${_schedule}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>T???o s??? ki???n m???i</div>
            </div>
            <div className='bg-white rounded-md'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid grid-cols-5 mt-4 py-8'>
                        <div className='col-start-2 col-span-3'>
                            <div className='grid grid-cols-3'>
                                <div className='mx-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> Ng??y th???c hi???n
                                    </div>
                                    <DatePicker locale={locale}
                                        style={{ width: '100%' }}
                                        name='start_at'
                                        placeholder='Ch???n ng??y th???c hi???n'
                                        onChange={onChangeDate}
                                        defaultValue={moment(startDate, "DD/MM/YYYY")}
                                        format='DD/MM/YYYY' />
                                    {/* {formik.errors.start_at && formik.touched.start_at && (
                                    <p className='m-0 mt-1 text-red-600'>{formik.errors.start_at}</p>
                                )} */}

                                </div>
                                <div className='mx-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> Th???i gian b???t ?????u
                                    </div>
                                    <TimePicker locale={locale}
                                        style={{ width: '100%' }}
                                        name='start_at'
                                        defaultOpenValue={moment(startDate)}
                                        placeholder='B???t ?????u'
                                        onChange={onChangeStart}
                                        format='HH:mm' />
                                </div>
                                <div className='mx-4'>
                                    <div className='flex'>
                                        Th???i gian k???t th??c
                                    </div>
                                    <TimePicker locale={locale} style={{ width: '100%' }} name='end_at' placeholder='K???t th??c' defaultOpenValue={moment(startDate)} onChange={onChangeEnd} format='HH:mm' />
                                </div>

                            </div>
                            <div className='mx-4'>
                                <div className='my-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> Ch??? tr??
                                    </div>
                                    <input type="text" name='host' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Ch??? tr??" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        <div className='text-red-500 mt-1 mr-1'>*</div> ?????a ??i???m
                                    </div>
                                    <input type="text" name='location' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="?????a ??i???m" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        Chu???n b???
                                    </div>
                                    <input type="text" name='preparation' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="Chu???n b???" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        N???i dung s??? ki???n
                                    </div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        name='event_notice'

                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            formik.setFieldValue('event_notice', data)
                                        }}
                                    />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        T??i li???u ????nh k??m
                                    </div>
                                    <Upload {...props} accept=".docx, .pdf">
                                        <button className='border rounded-md flex items-center px-2 py-1 hover:border-blue-300 '>
                                            <AiOutlineUpload className='mx-2' />T??i li???u ????nh k??m
                                        </button>
                                    </Upload>

                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        Th??nh vi??n tham gia
                                    </div>
                                    <input type="text" name='attenders' onChange={formik.handleChange} className='p-2 border-gray border rounded-lg focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' placeholder="--Th??nh vi??n tham gia--" />
                                </div>
                                <div className='my-4'>
                                    <div className='flex'>
                                        Th??ng b??o
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
                                        placeholder="--Ch???n ng?????i nh???n th??ng b??o--"
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
                                    T???o m???i s??? ki???n
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>


        </Fragment >
    )
}
