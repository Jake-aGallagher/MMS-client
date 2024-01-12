import { addScheduleConn } from './addScheduleConn';

interface Props {
    data: any;
    propertyId: number;
    assetId: number;
    closeModal: () => void;
}

export const addScheduleHandler = async (props: Props) => {
    const alertString = 'There has been an issue creating this PM Schedule, please try again.';
    try {
        const response = await addScheduleConn({
            propertyId: props.propertyId,
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
        alert(alertString);
    }
};
