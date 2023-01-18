import { DatePicker, Table } from 'antd';
import React, { Fragment } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ScheduleStore } from '../../mobxStore/ScheduleStore';
import moment from 'moment';
import { history } from '../../App';
import { _create, _schedule, _view } from '../../utils/config/configPath';
import { BsCalendar4 } from 'react-icons/bs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN'
import './style.css'


export default function Schedule() {
    const schedule = ScheduleStore()

    // console.log('first', schedule?.lstSchedule)

    const onChange = (date, dateString) => {
        const monday = new Date(date._d);
        const sunday = new Date(date._d);
        var d = monday.getDay();
        var s = sunday.getDay();
        var diff = monday.getDate() - d + (d === 0 ? -6 : 1);
        var diff2 = sunday.getDate() - s + (s === 0 ? 0 : 6);
        const setMonday = new Date(monday.setDate(diff));
        const setSunday = new Date(sunday.setDate(diff2));
        const from_date = new Date(setMonday)
            .toISOString("yyyy-mm-dd")
            .split("T")[0];
        const to_date = new Date(setSunday).toISOString("yyyy-mm-dd").split("T")[0];
        schedule.getSchedule(from_date, to_date);
    };

    const columns = [
        {
            title: 'Ngày tháng',
            dataIndex: 'start_at',
            render: (index, item) => {
                return <div className='font-bold text-center'>
                    <div>
                        {moment(item.start_at).format('dddd')}
                    </div>
                    <div>
                        {moment(item.start_at).format('DD/MM')}
                    </div>
                </div>
            },
            width: '10%'
        },
        {
            title: 'Nội dung công việc',
            dataIndex: 'event_notice',
            render: (index, item) => {
                return <Fragment>
                    <div className='flex font-bold'>
                        <div >
                            {moment(item.start_at).format('h:mm a')}
                        </div>
                        <div className='mx-2'>to</div>
                        <div >
                            {moment(item.end_at).format('h:mm a')}
                        </div>
                    </div>
                    {item.event_notice.replace('<p>', '</p>').replace('<p>', '</p>').split('</p>')}
                </Fragment>
            },

        },
        {
            title: 'Tài liệu',
            dataIndex: 'preparation',
            width: '15%'


        },
        {
            title: 'Thành viên tham gia',
            dataIndex: 'attenders',
            width: '15%'

        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            width: '15%'

        },
        {
            title: 'Chủ trì',
            dataIndex: 'host',
            width: '15%'

        },
        {
            title: '',
            dataIndex: 'id',
            render: (text, user) => {
                return <div className='flex'>
                    <button className='mx-4 text-green-500 hover:text-green-900' title='Chi tiết' onClick={() => {
                        history.push(`${_schedule}${_view}/${user.schedule_code}`)
                    }}>
                        <BsCalendar4 style={{ fontSize: 25 }} />
                    </button>
                </div>
            },
        },
    ];
    return (
        <Fragment>
            <div className='absolute flex right-4 -mt-16'>
                <div className='mx-2'>
                    <DatePicker locale={locale} onChange={onChange} picker="week" placeholder='Chọn tuần' />
                </div>
                <button className='border py-1 px-4 text-white flex items-center hover:border-blue-500' style={{ backgroundColor: '#2c65ac' }} onClick={() => {
                    history.push(`${_schedule}${_create}`)
                }}><AiOutlinePlusCircle className='mr-1' />Tạo sự kiện mới</button>
            </div>
            <Table dataSource={schedule?.lstSchedule[0]} columns={columns} />
        </Fragment>
    )
}
