import { Dispatch, SetStateAction } from 'react';
import SearchFormInput from './dataTableSearchInput';
import { useForm } from 'react-hook-form';
import DataTableSeachForm from './dataTableSearchForm';
import DataTableSearchSubmit from './dataTableSearchSubmit';

interface Props {
    headers: {
        id: string;
        name: string;
        type: string;
        search: boolean;
        order: boolean;
        nameParam?: string;
        functionIdPointer?: string;
        functionNamePointer?: string;
        hidePointer?: string;
        avgUsagePointer?: string;
        quantRemainPonter?: string;
    }[];
    currentFilters: { formName: string; value: number | string; filterType: string }[];
    setFiltersArr: Dispatch<SetStateAction<{ formName: string; value: number | string; filterType: string }[]>>;
}

const DataTableSearch = (props: Props) => {
    const { register, handleSubmit, reset } = useForm({});

    const clearFilters = () => {
        props.setFiltersArr([]);
        reset()
    };

    const handleRegistration = async (data: any) => {
        const dataKeys = Object.keys(data);
        let newFiltersArr: { formName: string; value: number | string; filterType: string }[] = [];
        dataKeys.forEach((item: any) => {
            if (data[item].length > 0 && data[item].trim().length > 0) {
                newFiltersArr.push({ formName: item, value: data[item], filterType: 'string' });
            } else if (typeof data[item] === 'number' && isFinite(data[item])) {
                newFiltersArr.push({ formName: item, value: data[item], filterType: 'number' });
            }
        });
        props.setFiltersArr(newFiltersArr);
    };

    const searchItems = props.headers.map((item) => {
        if (item.search) {
            return (
                <div>
                    <SearchFormInput register={register} label={item.name} type={item.type} formName={item.id} />
                </div>
            );
        }
    });

    return (
        <div>
            <DataTableSeachForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                {searchItems}
                <DataTableSearchSubmit clearFilters={clearFilters} />
            </DataTableSeachForm>
        </div>
    );
};

export default DataTableSearch;
