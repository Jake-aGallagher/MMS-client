import { Dispatch, SetStateAction } from 'react';

interface Props {
    searchFilter: { type: number; value: string };
    setSearchFilter: Dispatch<
        SetStateAction<{
            type: number;
            value: string;
        }>
    >;
}

const SparesSearch = (props: Props) => {
    return (
        <>
            <label htmlFor="searchInput" className="mb-2">
                Spares Search
            </label>
            <div className="flex flex-row mb-5">
                <select
                    id="selectBy"
                    className="rounded-sm bg-blue-200 mr-2"
                    value={props.searchFilter.type}
                    onChange={(e) => props.setSearchFilter({ type: parseInt(e.target.value), value: props.searchFilter.value })}
                >
                    <option value={0}>Part Number / ID</option>
                    <option value={1}>Part Name</option>
                </select>
                <input
                    id="searchInput"
                    type="text"
                    className="rounded-sm bg-blue-200 w-full"
                    value={props.searchFilter.value}
                    onChange={(e) => props.setSearchFilter({ type: props.searchFilter.type, value: e.target.value })}
                />
                <div
                    className="ml-2 rounded-md bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent"
                    onClick={(e) => [e.preventDefault(), props.setSearchFilter({ type: props.searchFilter.type, value: '' })]}
                >
                    Clear
                </div>
            </div>
        </>
    );
};

export default SparesSearch;
