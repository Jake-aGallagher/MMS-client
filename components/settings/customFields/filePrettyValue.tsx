import { FileData } from '../../../commonTypes/CustomFields';
import { SERVER_URL } from '../../utility/routing/addressAPI';

interface Props {
    clientId: string;
    fieldId: number;
    value: string;
    fileData: FileData;
}

const FilePrettyValue = (props: Props) => {
    if (props.fileData[props.fieldId] === undefined || props.value === 'undefined' || props.value === null || props.value === '') return '';
    const values = props.value.split(',');
    const fileList = values.map((item, i) => {
        if (props.fileData[props.fieldId][i] === undefined) return '';
        return (
            <li key={'file_list_' + props.fileData[props.fieldId][i].encodedId}>
                <a className="text-accent hover:text-primary" href={`${SERVER_URL}/getfile/${props.clientId}/${props.fileData[props.fieldId][i].encodedId}`}>
                    {props.fileData[props.fieldId][i].name}
                </a>
            </li>
        );
    });
    return <ul>{fileList}</ul>;
};

export default FilePrettyValue;
