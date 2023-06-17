import { Dispatch, SetStateAction } from "react";

interface Props {
    searchOptions: {type: string}[];
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SelectSearch = (props: Props) => {
    return (
        <select value={props.searchTerm} onChange={(e) => props.setSearchTerm(e.target.value)}>
            {props.searchOptions.map((item) => (
                <option key={'type_option_' + item.type} value={item.type}>
                    {item.type}
                </option>
            ))}
        </select>
    );
};

export default SelectSearch;
