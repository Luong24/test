import { DatePicker, Table } from 'antd';
import React, { Fragment } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ScheduleStore } from '../../mobxStore/ScheduleStore';
export default function Schedule() {
    const schedule = ScheduleStore()


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
        },
        {
            title: 'Nội dung công việc',
            dataIndex: 'event_notice',
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
            <Table dataSource={schedule?.lstSchedule[0]} columns={columns} />
        </Fragment>
    )
}
