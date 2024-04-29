import { GlobalDebug } from '../../../debug/globalDebug';
import { addScheduleConn } from './addScheduleConn';

interface Props {
    data: any;
    facilityId: number;
    assetId: number;
    closeModal: () => void;
}

export const addScheduleHandler = async (props: Props) => {
    const alertString = 'There has been an issue creating this PM Schedule, please try again.';
    try {
        const response = await addScheduleConn({
            facilityId: props.facilityId,
            assetId: props.assetId,
            type: props.data.type,
            title: props.data.title,
            description: props.data.description,
            startNow: props.data.startNow,
            scheduleStart: props.data.scheduleStart.toString() || null,
            frequencyTime: props.data.frequencyTime,
            frequencyUnit: props.data.frequencyUnit,
        });
        if (response.data.created) {
            props.closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addScheduleHandler', [
            ['error', err],
            ['data', props.data],
            ['facilityId', props.facilityId],
            ['assetId', props.assetId],
        ]);
        alert(alertString);
    }
};
