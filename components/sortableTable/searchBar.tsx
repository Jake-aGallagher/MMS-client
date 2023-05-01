import { Dispatch, SetStateAction } from "react";

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
    searchType: string;
    searchTerm: string;
    setSearchType: Dispatch<SetStateAction<string>>
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchBar = (props: Props) => {

    const buildSearchArea = () => {
            const searchableHeaders = props.headers.filter((item) => item.search === true);

            return (
                <div className="flex flex-col w-max my-4 ml-10 rounded-sm">
                    <select className="mb-2" value={props.searchType != '' ? props.searchType : searchableHeaders[0].name} onChange={searchOptionHandler}>{searchOptions(searchableHeaders)}</select>
                    <input className="bg-blue-200 rounded-sm" value={props.searchTerm} onChange={(e) => props.setSearchTerm(e.target.value)}></input>
                </div>
            );
    };

    const searchOptions = (options: Props['headers']) => {
        return options.map((item) => <option key={item.id + '_searchOption'} value={item.id}>{item.name}</option>);
    };

    const searchOptionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setSearchType(e.target.value)
        props.setSearchTerm('')
    }


    return buildSearchArea();
};

export default SearchBar;
