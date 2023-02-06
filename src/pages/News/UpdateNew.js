import { useFormik } from 'formik'
import React, { Fragment, useState } from 'react'
import { history } from '../../App'
import { _new } from '../../utils/config/configPath'
import { AiOutlineArrowLeft, AiOutlineUpload } from 'react-icons/ai'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Upload, message } from 'antd'
import { DOMAIN, TOKEN } from '../../utils/settings/config'


export default function UpdateNew() {
    const [file, setFile] = useState();

    const handleFile = (info) => {


        if (info.file.status === 'done') {

            info.fileList?.map(item => setFile(item.response.file_id))
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} tải lên thất bại!`);
        }
    }

    const props = {
        name: 'file',
        action: `${DOMAIN}/api/v1/upload`,
        headers: {
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}`
        },
        onChange: handleFile
        // onChange(info) {
        //     // console.log('first', info)
        //     // if (info.file.status !== 'uploading') {
        //     //     let reader = new FileReader();
        //     //     reader.onload = (e) => {
        //     //         // console.log('firt', e.target.result);
        //     //     }
        //     //     reader.readAsText(info.file.originFileObj);
        //     // }
        //     if (info.file.status === 'done') {
        //         // formik.setFieldValue('file_id', info.file.response.file_id)
        //         setFile(info.file.response.file_id)
        //         // message.success(`${info.file.name} tải lên thành công!`);
        //     } else if (info.file.status === 'error') {
        //         message.error(`${info.file.name} tải lên thất bại!`);
        //     }
        // },
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            attachments_request: {
                new_items: ''
            },
            content: '',
            author: {
                name_lowercase: '',
                user_name: ''
            },
            id: '',
            subject: '',
        },
        onSubmit: values => {


        }
    })
    return (
        <Fragment>
            <div className='-mt-10 flex items-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-white hover:text-blue-500' onClick={() => {
                    history.push(`${_new}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>Sửa thông tin</div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='bg-white rounded-md grid grid-cols-7'>
                    <div className='col-start-3 col-span-3 my-8'>
                        <div className='flex items-center my-4'>
                            <div className='w-1/4 text-end mr-4'>
                                <span className='text-red-500 mr-1'>*</span>Tiêu đề:
                            </div>
                            <div className='w-3/4'>
                                <input placeholder='Nhập tiêu đề' name='subject' onChange={formik.handleChange} className='p-2 border-gray border rounded focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' />
                            </div>
                        </div>
                        <div className='flex my-4'>
                            <div className='w-1/4 text-end mr-4'>
                                Nội dung:
                            </div>
                            <div className='w-3/4'>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                    name='content'
                                    className='h-48'
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        formik.setFieldValue('content', data)
                                    }}
                                />
                            </div>
                        </div>
                        <div className='flex my-4'>
                            <div className='w-1/4 text-end mr-4'>
                                Tài liệu đính kèm:
                            </div>
                            <div className='w-3/4'>
                                <Upload {...props}>
                                    <div type='text' name='new_items' className='border rounded-md flex items-center px-2 py-1 hover:border-blue-300 '>
                                        <AiOutlineUpload className='mx-2' />Chọn tài liệu đính kèm
                                    </div>
                                </Upload>
                            </div>
                        </div>
                        <div className='text-end'>
                            <button type='submit' className='border px-4 py-2 rounded text-white bg-blue-800 opacity-80 hover:opacity-50' onClick={() => {
                            }}>
                                Đăng thông báo
                            </button>
                        </div>
                    </div>

                </div>
            </form>

        </Fragment>
    )
}
