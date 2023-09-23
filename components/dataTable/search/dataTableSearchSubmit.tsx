interface Props {
    clearFilters: () => void;
}

const DataTableSearchSubmit = (props: Props) => {
    return (
        <div className="flex flex-col justify-evenly items-center px-4">
            <button className="btnBlue h-8 px-2 w-20">Search</button>

            <button
                className="btnRed h-8 px-2 w-20"
                onClick={(e) => [e.preventDefault(), props.clearFilters()]}
            >
                Clear
            </button>
        </div>
    );
};

export default DataTableSearchSubmit;
