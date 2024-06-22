import { editPMConn } from './editPMConn';

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

export const editPMHandler = async (
    data: { status: string; notes: string; continueSchedule: string; [key: string]: any },
    PMId: number,
    complete: boolean,
    currentFacility: number,
    loggedTimeDetails: LoggedTime[],
    sparesSelected: SparesSelected[],
    closeModal: () => void
) => {
    const response = await editPMConn({
        id: PMId,
        status: data.status,
        notes: data.notes,
        complete,
        facilityId: currentFacility,
        loggedTimeDetails,
        continueSchedule: data.continueSchedule,
        sparesUsed: sparesSelected,
        fieldData: data,
    });
    if (response.data.updated) {
        closeModal();
    } else {
        alert('There has been an issue edititng this PM, please try again.');
    }
};
