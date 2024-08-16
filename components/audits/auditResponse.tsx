import { AuditQuestion } from '../../commonTypes/audits';
import { FileData } from '../../commonTypes/CustomFields';
import FilePrettyValue from '../settings/customFields/filePrettyValue';
import ImmagePrettyValue from '../settings/customFields/imagePrettyValue.';

interface Props {
    question: AuditQuestion;
    clientId: string;
    fileData: FileData;
}

const AuditResponse = (props: Props) => {
    const singleEnum = ['select', 'radio'];
    const multiEnum = ['multi-select'];
    const image = ['image', 'signature'];
    const file = ['file'];

    if (singleEnum.includes(props.question.question_type)) {
        if (props.question.response?.responseValue === undefined || props.question.options === undefined) {
            return <td className="pl-2"></td>;
        }
        const option = props.question.options.find((option) => option.id === parseInt(props.question.response?.responseValue || '0'));
        return <td className="pl-2">{option?.title}</td>;
    }

    if (multiEnum.includes(props.question.question_type)) {
        if (props.question.response?.responseValue === undefined || props.question.options === undefined) {
            return <td className="pl-2"></td>;
        }
        const responseValues = props.question.response?.responseValue.split(',');
        const options = props.question.options.filter((option) => responseValues.includes(option.id.toString()));
        return (
            <td className="pl-2">
                {options.map((option, index) => (
                    <div key={index}>{option.title}</div>
                ))}
            </td>
        );
    }

    if (image.includes(props.question.question_type) && props.question.response?.responseValue) {
        return <td className="pl-2"><ImmagePrettyValue clientId={props.clientId} fieldId={props.question.id} fileData={props.fileData} /></td>
    }

    if (file.includes(props.question.question_type) && props.question.response?.responseValue) {
        return <td className="pl-2"><FilePrettyValue clientId={props.clientId} fieldId={props.question.id} value={props.question.response?.responseValue || ''} fileData={props.fileData} /></td>
    }

    if (props.question.question_type === 'date' && props.question.response?.responseValue) {
        return <td className="pl-2">{new Date(props.question.response?.responseValue || '').toLocaleDateString()}</td>;
    }

    if (props.question.question_type === 'checkbox') {
        return <td className="pl-2">{props.question.response?.responseValue ? 'Yes' : 'No'}</td>;
    }

    return <td className="pl-2">{props.question.response?.responseValue}</td>;
};

export default AuditResponse;
