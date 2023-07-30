import { Dispatch, SetStateAction } from 'react';
import DataTableSearchInput from './dataTableSearchInput';
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
        reset();
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
            return <DataTableSearchInput register={register} label={item.name} type={item.type} formName={item.id} key={item.id} />;
        }
    });

    return (
        <div className='w-full flex flex-row justify-center my-5 px-2'>
            <DataTableSeachForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <div className='flex flex-row min-h-fit'>
                    <div className="flex flex-row flex-wrap">{searchItems}</div>
                    <DataTableSearchSubmit clearFilters={clearFilters} />
                </div>
            </DataTableSeachForm>
        </div>
    );
};

export default DataTableSearch;
