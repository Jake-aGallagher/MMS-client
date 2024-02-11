import { SetStateAction } from 'react';
import { createJobConn } from './createJobConn';

interface Props {
    data: any;
    currentProperty: number;
    assetId: number;
    userId: number;
    closeModal: () => void;
    setModalPayload: (value: SetStateAction<number>) => void;
    setModalType: (value: SetStateAction<string>) => void;
    setViewModal: (value: SetStateAction<boolean>) => void;
}

export const createJobHandler = async (props: Props) => {
    const alertString = 'There has been an issue creating this Job, please try again.';
    try {
        const response = await createJobConn({
            propertyNumber: props.currentProperty,
            assetNumber: props.assetId,
            type: props.data.selectedType,
            title: props.data.title,
            description: props.data.description,
            urgency: props.data.selectedUrgency,
            reported_by: props.userId,
            fieldData: props.data
        });
        if (response.data.created && props.data.compNow == 'No') {
            props.closeModal();
        } else if (response.data.created && props.data.compNow == 'Yes') {
            props.setModalPayload(response.data.jobId);
            props.setModalType('updateJob');
            props.setViewModal(true);
        } else {
            alert(alertString);
        }
    } catch (err) {
        alert(alertString);
    }
};
