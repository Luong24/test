import { DatePicker, Table } from 'antd';
import React, { Fragment, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import moment from 'moment'
import { ScheduleStore } from '../../mobxStore/ScheduleStore';
export default function Schedule() {
    const onChange = (date, dateString) => {
        console.log('data', moment(date).format('YYYY/MM/DDD'))
    };
    const schedule = ScheduleStore()
    console.log('schedule', schedule?.lstSchedule)
    useEffect(() => {
        schedule.getSchedule()
    })

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'Ngày tháng',
            dataIndex: 'name',
        },
        {
            title: 'Nội dung công việc',
            dataIndex: 'age',
        },
        {
            title: 'Tài liệu',
            dataIndex: 'preparation',
        },
        {
            title: 'Thành viên tham gia',
            dataIndex: 'attenders',
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
        },
        {
            title: 'Chủ trì',
            dataIndex: 'host',
        },
    ];
    return (
        <Fragment>
            <div className='absolute flex right-4 -mt-16'>
                <div className='mx-2'>
                    <DatePicker onChange={onChange} picker="week" placeholder='Chọn tuần' />
                </div>
                <button className='border py-1 px-4 text-white flex items-center hover:border-blue-500' style={{ backgroundColor: '#2c65ac' }}><AiOutlinePlusCircle className='mr-1' />Tạo sự kiện mới</button>
            </div>
            <Table dataSource={schedule?.lstSchedule} columns={columns} />
        </Fragment>
    )
}
