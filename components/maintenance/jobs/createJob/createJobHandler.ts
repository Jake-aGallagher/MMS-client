import { SetStateAction } from 'react';
import { createJobConn } from './createJobConn';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface Props {
    data: any;
    currentFacility: number;
    assetId: number;
    userId: number;
    closeModal: () => void;
    setModal: (value: SetStateAction<{ view: boolean; type: string; payload: { id: number; name: string, auditType?: string } }>) => void;
}

export const createJobHandler = async (props: Props) => {
    const alertString = 'There has been an issue creating this Job, please try again.';
    try {
        const response = await createJobConn({
            facilityNumber: props.currentFacility,
            assetNumber: props.assetId,
            type: props.data.selectedType,
            title: props.data.title,
            description: props.data.description,
            urgency: props.data.selectedUrgency,
            reported_by: props.userId,
            fieldData: props.data,
        });
        if (response.data.created && props.data.compNow == 'No') {
            props.closeModal();
        } else if (response.data.created && props.data.compNow == 'Yes') {
            props.setModal({ view: true, type: 'updateJob', payload: { id: response.data.jobId, name: '' } });
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('createJobHandler', [
            ['error', err],
            ['data', props.data],
            ['currentFacility', props.currentFacility],
            ['assetId', props.assetId],
            ['userId', props.userId],
        ]);
        alert(alertString);
    }
};
