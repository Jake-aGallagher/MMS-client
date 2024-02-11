import { CustomFieldData } from "../../../commonTypes/CustomFields";
import { DetailsConfig } from "../../../commonTypes/DetailsConfig";

export const addToDetailsConfig = (config: DetailsConfig, customFields: CustomFieldData) => {
    const newConfig = { ...config };
    customFields.fields.forEach((field) => {
        newConfig.fields.push({ label: field.name, value: field.value });
    });
    return newConfig;
}