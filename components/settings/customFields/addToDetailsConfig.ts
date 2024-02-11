import { CustomFieldData } from '../../../commonTypes/CustomFields';
import { DetailsConfig } from '../../../commonTypes/DetailsConfig';
import { prettyFieldValues } from './fieldPrettyValues';

export const addToDetailsConfig = (config: DetailsConfig, customFields: CustomFieldData) => {
    const newConfig = { ...config };
    customFields.fields.forEach((field) => {
        newConfig.fields.push({ label: field.name, value: prettyFieldValues(field.id, field.type, field.value || '', customFields.enumGroups, customFields.fileData, field.enumGroupId) });
    });
    return newConfig;
};
