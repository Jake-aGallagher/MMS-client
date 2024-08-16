import { FileData } from '../../../commonTypes/CustomFields';
import { SERVER_URL } from '../../utility/routing/addressAPI';

interface Props {
    clientId: string;
    fieldId: number;
    fileData: FileData;
}

const ImagePrettyValue = (props: Props) => {
    if (props.fileData[props.fieldId] === undefined || props.fileData[props.fieldId][0] === undefined || props.fileData[props.fieldId][0].encodedId === undefined) return '';
    return <img src={`${SERVER_URL}/getimage/${props.clientId}/${props.fileData[props.fieldId][0].encodedId}`} alt="Uploaded Photo" className="w-full" />;
};

export default ImagePrettyValue;
