import { EnumGroups, FileData } from "../../../commonTypes/CustomFields";
import { SERVER_URL } from "../../routing/addressAPI";

export const prettyFieldValues = (fieldId: number, type: string, value: string, enumGroups: EnumGroups, fileData: FileData, enumGroupId: number | null) => {
    if (value === 'undefined' || value === null || value === '') return '';
    switch (type) {
        case 'checkbox':
            return value ? 'Yes' : 'No';
        case 'date':
            return new Date(value).toLocaleDateString();
        case 'select':
            return enumGroups[enumGroupId!].find((item) => item.id == parseInt(value))?.value || 'Enum Group Not Found';
        case 'file':
            const values = value.split(',');
            const fileList = values.map((item, i) => (
                <li key={'file_list_' + fileData[fieldId][i].encodedId}>
                    <a className="text-accent hover:text-primary" href={`${SERVER_URL}/getfile/${fileData[fieldId][i].encodedId}`}>
                        {fileData[fieldId][i].name}
                    </a>
                </li>
            ));
            return <ul>{fileList}</ul>;
        case 'image':
        case 'signature':
            return <img src={`${SERVER_URL}/getimage/${fileData[fieldId][0].encodedId}`} alt="Uploaded Photo" className="w-full" />
        default:
            return value;
    }
};