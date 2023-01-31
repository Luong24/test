



import { baseServices } from "./baseServices";

class ManageScheduleService extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getWorkSchedule = (from_date, to_date) => {
        return this.get(`api/v1/work-schedules?from_date=${from_date}&to_date=${to_date}`)
    }
    getDetailSchedule = (code) => {
        return this.get(`api/v1/work-schedules/${code}`)
    }
    deleteSchedule = (code) => {
        return this.delete(`api/v1/work-schedules/${code}`)
    }
}


export const manageScheduleService = new ManageScheduleService();