import { updateJobFullConn } from './updateJobFullConn';

interface LoggedTime {
    id: number;
    time: number;
}

interface SparesSelected {
    id: number;
    part_no: string;
    name: string;
    quantity: number;
}

interface Downtime {
    id: number;
    name: string;
    time: number;
}

export const updateJobFullHandler = async (
    complete: boolean,
    data: any,
    jobId: number,
    currentFacility: number,
    loggedTimeDetails: LoggedTime[],
    sparesSelected: SparesSelected[],
    sparesMissing: SparesSelected[],
    downtime: Downtime[],
    closeModal: () => void
) => {
    const response = await updateJobFullConn({
        id: jobId,
        status: data.status,
        description: data.description,
        notes: data.notes,
        logged_time_details: loggedTimeDetails,
        complete,
        continueSchedule: data.continueSchedule,
        sparesUsed: sparesSelected,
        sparesMissing,
        downtime,
        facilityId: currentFacility,
        fieldData: data,
    });
    if (response.data.created) {
        closeModal();
    } else {
        alert('There has been an issue updating this Job, please try again.');
    }
};
