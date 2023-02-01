import React, { Fragment, useEffect } from 'react'
import { ScheduleStore } from '../../mobxStore/ScheduleStore';
import { history } from '../../App';
import { _schedule, _update } from '../../utils/config/configPath';
import { AiOutlineArrowLeft, AiOutlineDelete } from 'react-icons/ai';
import moment from 'moment';
import { BsCalendar4, BsClock, BsPencilSquare } from 'react-icons/bs';
import { Popconfirm } from 'antd';



export default function DetailSchedule(props) {
    let { code } = props.match.params;
    const detail = ScheduleStore();

    // console.log('first', detail.detailSchedule[0].assignees.length)


    useEffect(() => {
        detail.getDetailSchedule(code)
    }, [])
    function uppercase(str) {
        var array1 = str.split(' ');
        var newarray1 = [];

        for (var x = 0; x < array1.length; x++) {
            newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
        }
        return newarray1.join(' ');
    }
    const stringToHTML = (str) => {
        var dom = document.createElement("div");
        dom.innerHTML = str;
        return dom;
    };

    return (
        <Fragment>
            <div className='-mt-10 flex items-center text-lg'>
                <button className='rounded-full p-2 mr-2 hover:bg-white hover:text-blue-500' onClick={() => {
                    history.push(`${_schedule}`)
                }}><AiOutlineArrowLeft /></button>
                <div className='font-medium'>Chi tiết sự kiện</div>
            </div>
            <div className='bg-white rounded-md mt-4 py-8'>
                <div className='grid grid-cols-5'>
                    <div className='col-start-2 col-span-3'>
                        <dl>
                            <div className='flex bg-slate-100 p-4 rounded-t-2xl'>
                                <dt className='w-1/5'>Thông tin</dt>
                                <dt className='w-4/5'>Mô tả chi tiết</dt>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Ngày thực hiện</dd>
                                <dd className='w-4/5 flex items-center'><BsCalendar4 className='mr-2' />{detail.detailSchedule[0]?.start_at ? <div>
                                    {moment(detail.detailSchedule[0]?.start_at).format('DD/MM/YYYY')}
                                </div> : <i>Không có</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Thời gian bắt đầu</dd>
                                <dd className='w-4/5 flex items-center'><BsClock className='mr-2' />{detail.detailSchedule[0]?.start_at ? <div>
                                    {moment(detail.detailSchedule[0]?.start_at).format('HH:mm')}
                                </div> : <i>Không có</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Thời gian kết thúc</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.end_at ? <div className='flex items-center'><BsClock className='mr-2' />{moment(detail.detailSchedule[0]?.end_at).format('HH:mm')}</div> : <i>Không rõ</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Chủ trì</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.host}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Địa điểm</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.location}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Chuẩn bị</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.preparation ? detail.detailSchedule[0]?.preparation : <i>Không có chuẩn bị</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Nội dung sự kiện</dd>
                                <dd className='w-4/5'>{stringToHTML(detail.detailSchedule[0]?.event_notice).textContent}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Tài liệu đính kèm</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.file_ids ? <div>hello</div> : <i>Không có tài liệu đính kèm</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Thành viên tham gia</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.attenders ? <div>{detail.detailSchedule[0]?.attenders}</div> : <i>Không có thành viên tham gia</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Thông báo</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.assignees?.length !== 1 ? <div>{detail.detailSchedule[0]?.assignees?.slice(0, detail.detailSchedule[0]?.assignees?.length - 1).map(item => {
                                    return <span>{uppercase(item.name_uppercase.toLowerCase())}, </span>
                                })}</div> : <i>Không có người nhận thông báo</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Ngày tạo</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.assignees ? <div>
                                    {uppercase(detail.detailSchedule[0]?.assignees[detail.detailSchedule[0]?.assignees.length - 1]?.name_uppercase.toLowerCase())} - {moment(detail.detailSchedule[0]?.created_at).format('DD/MM/YYYY HH:mm')}
                                </div> : <i>Không có</i>}</dd>
                            </div>
                            <div className='flex px-4 pt-3 pb-1 border-b bg-gray-50'>
                                <dd className='w-1/5'>Chỉnh sửa lần cuối</dd>
                                <dd className='w-4/5'>{detail.detailSchedule[0]?.last_edit_by ? <div>{detail.detailSchedule[0]?.last_edit_by}</div> : <i>Chưa có thông tin</i>}</dd>
                            </div>
                        </dl>
                        <div className='flex justify-end'>
                            <button>
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa lịch này không?"
                                    onConfirm={() => { detail.delSchedule(code) }}
                                    okText="Đồng ý"
                                    cancelText="Không"
                                    className='flex items-center border py-1 px-4 mx-1 bg-red-500 rounded-md text-white hover:opacity-80'
                                >
                                    <AiOutlineDelete className='mr-2' /> Xóa
                                </Popconfirm>
                            </button>
                            <button className='flex items-center border py-1 px-4 mx-1 bg-blue-600 rounded-md text-white hover:opacity-80' onClick={() => {
                                history.push(`${_schedule}${_update}/${code}`)
                            }}>
                                <BsPencilSquare className='mr-2' />Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
