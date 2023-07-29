interface Props {
    clearFilters: () => void;
}

const DataTableSearchSubmit = (props: Props) => {
    return (
        <div className="flex flex-row justify-evenly items-center h-16 w-full bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={(e) => [e.preventDefault(), props.clearFilters()]}>
                Clear
            </button>

            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32">Search</button>
        </div>
    );
};

export default DataTableSearchSubmit;
