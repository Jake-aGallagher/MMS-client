import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    clearFilters: () => void;
    viewSearch: boolean;
    toggleViewSearch: () => void;
}

const DataTableSearchSubmit = (props: Props) => {
    return (
        <div className="flex flex-row justify-end items-center px-4">
            <button className="btnBlue h-8 px-2 w-20 flex flex-row justify-center items-center mr-auto" onClick={props.toggleViewSearch}>
                {props.viewSearch ? <FontAwesomeIcon icon={faChevronUp} className="h-5" /> : <FontAwesomeIcon icon={faChevronDown} className="h-5" />}
            </button>
            <button className="btnRed ml-4 h-8 px-2 w-20" onClick={(e) => [e.preventDefault(), props.clearFilters()]}>
                Clear
            </button>
            {props.viewSearch ? (
                <button className="btnBlue ml-4 h-8 px-2 w-20">Search</button>
            ) : (
                <button className="btnBlue ml-4 h-8 px-2 w-20" onClick={props.toggleViewSearch}>
                    Search
                </button>
            )}
        </div>
    );
};

export default DataTableSearchSubmit;
