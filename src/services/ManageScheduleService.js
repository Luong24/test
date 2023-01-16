



import { baseServices } from "./baseServices";

class ManageScheduleService extends baseServices {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getWorkSchedule = () => {
        return this.get(`api/v1/work-schedules?from_date=2022-07-04&to_date=2022-07-10`)
    }

}


export const manageScheduleService = new ManageScheduleService();