import { history } from "../App";
import { manageScheduleService } from "../services/ManageScheduleService"
import { useState } from 'react';
import { _schedule } from "../utils/config/configPath";


export function ScheduleStore() {
    const [schedule, setSchedule] = useState();
    const [detailschedule, setDetailSchedule] = useState();
    return {
        lstSchedule: [schedule],
        detailSchedule: [detailschedule],
        async getSchedule(from_date, to_date) {
            const result = await manageScheduleService.getWorkSchedule(from_date, to_date);
            if (result.status === 200) {
                setSchedule(result.data)
            }
        },
        async getDetailSchedule(code) {
            const result = await manageScheduleService.getDetailSchedule(code);
            if (result.status === 200) {
                setDetailSchedule(result.data)
            }
        },
        async delSchedule(code) {
            const result = await manageScheduleService.deleteSchedule(code);
            if (result.status === 200) {
                history.push(`${_schedule}`)
            }
        }
    }
}
