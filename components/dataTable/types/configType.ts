export interface DataTableConfig {
    headers: {
        id: string;
        name: string;
        type: string;
        search: boolean;
        order: boolean;
        nameParam?: string;
        avgUsagePointer?: string;
        quantRemainPonter?: string;
        functions?: string[];
    }[];
    searchable: boolean;
    selectSearch?: boolean;
    selectSearchType?: string;
    selectSearchOptions?: { type: string }[];
    linkColPrefix?: string;
    reverseSort?: boolean;
    modalType?: string;
    deleteUrl?: string;
    idPointer?: string;
    namePointer?: string;
    reload?: () => void;
}
