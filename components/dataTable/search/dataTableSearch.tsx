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
    currentFilters: { [key: string]: string | number };
    setFiltersObj: Dispatch<SetStateAction<{ [key: string]: string | number }>>;
}

const DataTableSearch = (props: Props) => {
    const { register, handleSubmit, reset } = useForm({});

    const clearFilters = () => {
        props.setFiltersObj({});
        reset();
    };

    const handleRegistration = async (data: any) => {
        props.setFiltersObj(data);
    };

    const searchItems = props.headers.map((item) => {
        if (item.search) {
            return <DataTableSearchInput register={register} label={item.name} type={item.type} formName={item.id} key={'input_' + item.id} />;
        }
    });

    return (
        <div className="w-full flex flex-row justify-center my-5 px-2">
            <DataTableSeachForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <div className="flex flex-row min-h-fit">
                    <div className="flex flex-row flex-wrap">{searchItems}</div>
                    <DataTableSearchSubmit clearFilters={clearFilters} />
                </div>
            </DataTableSeachForm>
        </div>
    );
};

export default DataTableSearch;
