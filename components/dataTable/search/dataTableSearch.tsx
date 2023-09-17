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
    const [view, setView] = useState(false);

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
            {view ? (
                <DataTableSeachForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <div className="flex flex-row min-h-fit">
                        <div className="flex flex-row flex-wrap">{searchItems}</div>
                        <DataTableSearchSubmit clearFilters={clearFilters} hide={() => setView(false)} />
                    </div>
                </DataTableSeachForm>
            ) : (
                <button onClick={() => setView(true)} className="h-10 w-80 border-solid border-2 border-primary hover:border-accent rounded-md flex flex-row justify-center items-center">
                    Search
                </button>
            )}
        </div>
    );
};

export default DataTableSearch;
