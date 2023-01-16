import { manageScheduleService } from "../services/ManageScheduleService"
import { useState } from 'react';


export function ScheduleStore() {
    const [schedule, setSchedule] = useState();
    return {
        lstSchedule: [schedule],
        async getSchedule(from_date, to_date) {
            const result = await manageScheduleService.getWorkSchedule(from_date, to_date);
            setSchedule(result.data)

        },
    }
}
