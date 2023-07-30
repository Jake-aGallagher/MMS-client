interface Props {
    clearFilters: () => void;
}

const DataTableSearchSubmit = (props: Props) => {
    return (
        <div className="flex flex-col justify-evenly items-center px-4">
            <button className="rounded-md bg-blue-50 hover:bg-blue-600 h-8 px-2  border-2 border-blue-600 w-20">Search</button>
            
            <button className="rounded-md bg-blue-50 hover:bg-blue-600 h-8 px-2  border-2 border-blue-600 w-20" onClick={(e) => [e.preventDefault(), props.clearFilters()]}>
                Clear
            </button>
        </div>
    );
};

export default DataTableSearchSubmit;
