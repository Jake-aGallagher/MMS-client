import { Dispatch, SetStateAction, useState } from 'react';
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
    const [viewSearch, setViewSearch] = useState(false);

    const filterKeys = Object.keys(props.currentFilters);
    const activeFilters = filterKeys.filter((item) => props.currentFilters[item]);

    const toggleViewSearch = () => {
        setViewSearch((prev) => !prev);
    };

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
        <div className={`w-full mx-auto flex flex-row justify-center my-5 p-2 rounded-md shadow-md bg-secondary ${viewSearch ? 'max-w-5xl' : 'max-w-lg'}`}>
            <DataTableSeachForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <div className="flex flex-col min-h-fit">
                    {viewSearch ? <div className="flex flex-row flex-wrap">{searchItems}</div> : <div className="px-4 pb-2 text-center">{`${activeFilters.length} active filters`}</div>}
                    <DataTableSearchSubmit clearFilters={clearFilters} viewSearch={viewSearch} toggleViewSearch={toggleViewSearch} />
                </div>
            </DataTableSeachForm>
        </div>
    );
};

export default DataTableSearch;
