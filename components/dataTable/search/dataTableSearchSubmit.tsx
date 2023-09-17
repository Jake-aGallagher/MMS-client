interface Props {
    clearFilters: () => void;
    hide: () => void;
}

const DataTableSearchSubmit = (props: Props) => {
    return (
        <div className="flex flex-col justify-evenly items-center px-4">
            <button className="rounded-md bg-background hover:bg-secondary h-8 px-2  border-2 border-accent hover:border-primary transition-all w-20">Search</button>

            <button className="rounded-md bg-background hover:bg-secondary h-8 px-2  border-2 border-accent hover:border-primary transition-all w-20" onClick={(e) => [e.preventDefault(), props.clearFilters()]}>
                Clear
            </button>
            <button className="rounded-md bg-background hover:bg-secondary h-8 px-2  border-2 border-accent hover:border-primary transition-all w-20" onClick={(e) => [e.preventDefault(), props.hide()]}>
                Hide
            </button>
        </div>
    );
};

export default DataTableSearchSubmit;
