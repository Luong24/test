import { DatePicker, Table } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
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
    const [startDate, setStartDate] = useState(new Date());

    //Hien thi lich theo date
    const monday = new Date(startDate);
    const sunday = new Date(startDate);
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

    useEffect(() => {
        schedule.getSchedule(from_date, to_date);
    }, [])

    const onChange = (date, dateString) => {
        // console.log('first', date._d)
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


    const names = new Set();
    const columns = [
        {
            title: 'Ng??y th??ng',
            dataIndex: 'start_at',
            rowSpan: 1,
            render: (value, row, index) => {
                const date = moment(value).format("DDMMYYYY")
                const obj = {
                    children: [
                        moment(value).format('dddd'),
                        <br />,
                        moment(value).format('DD/MM'),

                    ],
                    props: {},
                };
                if (names.has(date)) {
                    obj.props.rowSpan = 0;
                } else {
                    const occurCount = schedule.lstSchedule[0].filter((data) => moment(data.start_at).format("DDMMYYYY") === date).length;
                    obj.props.rowSpan = occurCount;
                    names.add(moment(value).format("DDMMYYYY"));
                }

                return obj;
            },
            width: '10%'
        },
        {
            title: 'N???i dung c??ng vi???c',
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
                    <div dangerouslySetInnerHTML={{ __html: item.event_notice }} />

                </Fragment>
            },

        },
        {
            title: 'T??i li???u',
            dataIndex: 'preparation',
            width: '15%'


        },
        {
            title: 'Th??nh vi??n tham gia',
            dataIndex: 'attenders',
            width: '15%'

        },
        {
            title: '?????a ??i???m',
            dataIndex: 'location',
            width: '15%'

        },
        {
            title: 'Ch??? tr??',
            dataIndex: 'host',
            width: '15%'

        },
        {
            title: '',
            dataIndex: 'id',
            render: (text, user) => {
                return <div className='flex'>
                    <button className='mx-4 text-green-500 hover:text-green-900' title='Chi ti???t' onClick={() => {
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
                    <DatePicker locale={locale} onChange={onChange} defaultValue={moment(startDate)} picker="week" placeholder='Ch???n tu???n' />
                </div>
                <button className='border py-1 px-4 text-white flex items-center hover:border-blue-500' style={{ backgroundColor: '#2c65ac' }} onClick={() => {
                    history.push(`${_schedule}${_create}`)
                }}><AiOutlinePlusCircle className='mr-1' />T???o s??? ki???n m???i</button>
            </div>
            <div className='bg-white rounded-md -mt-4' style={{ minHeight: '600px' }}>
                <Table className='p-4' dataSource={schedule?.lstSchedule[0]} columns={columns} />
            </div>
        </Fragment>
    )
}
