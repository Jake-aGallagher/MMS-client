import { editPMConn } from "./editPMConn";

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
    data: { status: string; notes: string; continueSchedule: string, [key: string]: any},
    PMId: number,
    complete: boolean,
    currentFacility: number,
    loggedTimeDetails: LoggedTime[],
    sparesSelected: SparesSelected[],
    closeModal: () => void,
    files: Blob[]
) => {
    const formData = new FormData();
    if (files.length > 0) {
        files.forEach((file) => formData.append('files', file));
    }
    formData.append(
        'data',
        JSON.stringify({
            id: PMId,
            status: data.status,
            notes: data.notes,
            complete,
            facilityId: currentFacility,
            loggedTimeDetails,
            continueSchedule: data.continueSchedule,
            sparesUsed: sparesSelected,
            fieldData: data
        })
    );
    const response = await editPMConn(formData)
    if (response.data.updated) {
        closeModal();
    } else {
        alert('There has been an issue edititng this PM, please try again.');
    }
};
