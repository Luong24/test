import { manageScheduleService } from "../services/ManageScheduleService"


export function ScheduleStore() {
    return {
        lstSchedule: [],
        async getSchedule() {
            const result = await manageScheduleService.getWorkSchedule();
            if (result.status === 200) {
                this.lstSchedule.forEach(item => {
                    // this.lstSchedule.push(item);
                    console.log('item', item)

                })

                // this.lstSchedule.push(result.data)
            }
        },
    }
}
