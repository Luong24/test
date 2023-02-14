import { useFormik } from 'formik'
import React, { Fragment, useEffect, useState } from 'react'
import { history } from '../../App'
import { _new } from '../../utils/config/configPath'
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineFile, AiOutlineUpload } from 'react-icons/ai'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Upload, message } from 'antd'
import { DOMAIN, TOKEN } from '../../utils/settings/config'
import { NewStore } from '../../mobxStore/NewStore'

export default function UpdateNew(props) {
    let { code } = props.match.params;
    const detail = NewStore();
    useEffect(() => {
        detail.getDetailNew(code)
    }, [])
    let detailNew = detail.lstDetail;
    let lstFile = detailNew?.attachments?.map((item) => item.file_name);
    // console.log('lstFile', lstFile)

    // console.log('detail', detailNew)
    const [file, setFile] = useState();
    // console.log('lstFile', file)

    // const [upload, setUpload] = useState(false);
    // console.log('upload', upload)
    const handleFile = (info) => {

        if (info.file.status === 'done') {

            info.fileList?.map(detailNew => setFile(detailNew.response.file_id))
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} tải lên thất bại!`);
        }
    }
    let a = []
    lstFile?.map((item, index) => {
        return a.push({
            uid: index,
            name: item
        });
    })


    // console.log('a', a)

    const propss = {
        name: 'file',
        action: `${DOMAIN}/api/v1/upload`,
        headers: {
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem(TOKEN))}`
        },
        onChange: (info) => {
            if (info.file.status === 'done') {
                info.fileList?.map(detailNew => setFile(detailNew.response.file_id))
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} tải lên thất bại!`);
            }
        },
        // fileList: a

    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            attachments_request: {
                new_items: file ? file : []
            },
            author: {
                name_lowercase: detailNew?.author?.name_lowercase,
                user_name: detailNew?.author?.user_name
            },
            content: detailNew?.content,
            subject: detailNew?.subject,
            id: detailNew?.id
        },
        onSubmit: values => {

            // detail.updateNew(values)

            console.log('values', values)

        }
    })
    return (
        <Fragment>
            <div className='-mt-10 flex detailNews-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-white hover:text-blue-500' onClick={() => {
                    history.push(`${_new}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>Sửa thông tin</div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='bg-white rounded-md grid grid-cols-7'>
                    <div className='col-start-3 col-span-3 my-8'>
                        <div className='flex detailNews-center my-4'>
                            <div className='w-1/4 text-end mr-4'>
                                <span className='text-red-500 mr-1'>*</span>Tiêu đề:
                            </div>
                            <div className='w-3/4'>
                                <input placeholder='Nhập tiêu đề' name='subject' onChange={formik.handleChange} value={formik.values.subject} className='p-2 border-gray border rounded focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 w-full' />
                            </div>
                        </div>
                        <div className='flex my-4'>
                            <div className='w-1/4 text-end mr-4'>
                                Nội dung:
                            </div>
                            <div className='w-3/4'>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={detailNew?.content}
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
                                <Upload {...propss}
                                    fileList={a}

                                >
                                    <div type='text' className='border rounded-md flex items-center px-2 py-1 hover:border-blue-300 '>
                                        <AiOutlineUpload className='mx-2' />Chọn tài liệu đính kèm
                                    </div>
                                </Upload>
                            </div>
                        </div>
                        <div className='text-end'>
                            <button type='submit' className='border px-4 py-2 rounded text-white bg-blue-800 opacity-80 hover:opacity-50'
                            // onClick={() => setUpload(true)}
                            >
                                Cập nhật thông báo
                            </button>
                        </div>
                    </div>

                </div>
            </form>

        </Fragment>
    )
}
