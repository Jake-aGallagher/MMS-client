import { EnumGroups, FileData } from "../../../commonTypes/CustomFields";
import FilePrettyValue from "./filePrettyValue";
import ImagePrettyValue from "./imagePrettyValue.";

export const prettyFieldValues = (clientId: string, fieldId: number, type: string, value: string, enumGroups: EnumGroups, fileData: FileData, enumGroupId: number | null) => {
    if (value === 'undefined' || value === null || value === '') return '';
    switch (type) {
        case 'checkbox':
            return value ? 'Yes' : 'No';
        case 'date':
            return new Date(value).toLocaleDateString();
        case 'select':
            if (enumGroupId === null) return 'Enum Group Not Found';
            return enumGroups[enumGroupId].find((item) => item.id == parseInt(value))?.value || 'Enum Group Not Found';
        case 'file':
            return <FilePrettyValue clientId={clientId} fieldId={fieldId} value={value} fileData={fileData} />
        case 'image':
        case 'signature':
            return <ImagePrettyValue clientId={clientId} fieldId={fieldId} fileData={fileData} />
        default:
            return value;
    }
};