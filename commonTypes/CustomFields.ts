export interface FieldValue {
    id: number;
    type: string;
    enumGroupId: number | null;
    name: string;
    required: boolean;
    sort_order: number;
    value: string;
}

export interface EnumGroups {
    [key: string]: {
        id: number;
        value: string;
    }[];
}

export interface FileData {
    [key: string]: {
        id: string;
        encodedId: string;
        name: string;
    }[];
}

export interface CustomFieldData {
    fields: FieldValue[];
    enumGroups: EnumGroups;
    fileData: FileData;
}

export interface DefaultValues {
    [key: string]: string | number | boolean;
}
