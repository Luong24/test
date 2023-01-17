import React, { useEffect } from 'react'
import { ScheduleStore } from '../../mobxStore/ScheduleStore';

export default function UpdateSchedule(props) {
    let { code } = props.match.params;
    const detail = ScheduleStore();

    useEffect(() => {
        detail.getDetailSchedule(code)
    }, [])

    console.log('first', detail.detailSchedule)
    return (
        <div>UpdateSchedule</div>
    )
}
