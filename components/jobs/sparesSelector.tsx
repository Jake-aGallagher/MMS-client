import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { SERVER_URL } from '../routing/addressAPI';
import SparesSearch from '../sparesForm/sparesSearch';
import DataTable from '../dataTable/dataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    closeModal: () => void;
    payload: { sparesSelected: SparesSelected[]; type: string };
    passbackDetails: (usedSparesArray: Spare[]) => void;
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
}

interface SparesSelected extends Spare {
    quantity: number;
}



const SparesSelector = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [sparesFullList, setSparesFullList] = useState<Spare[]>([]);
    const [sparesFiltered, setSparesFiltered] = useState<SparesSelected[]>([]);
    const [sparesSelected, setSparesSelected] = useState<SparesSelected[]>([]);
    const [searchFilter, setSearchFilter] = useState({ type: 0, value: '' });
    const [showRes, setShowRes] = useState(false);
    const [numResults, setNumResults] = useState(0);

    const usedConfig = {
        headers: [
            { id: 'part_no', name: 'Part Number', type: 'string', nameParam: 'part_no', search: false, order: false },
            { id: 'name', name: 'Name', type: 'string', search: false, order: false },
            { id: 'quantity', name: 'Quantity', type: 'number', search: false, order: false },
        ],
        searchable: false,
    };

    useEffect(() => {
        setLoading(true);
        setError(false);
        setSparesSelected(props.payload.sparesSelected);
        getHandler();
    }, []);

    useEffect(() => {
        filterResults();
    }, [sparesFullList, searchFilter]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares-for-use/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setNumResults(response.data.spares.length);
            if (response.data.spares.length === 0) {
            } else {
                setSparesFullList(response.data.spares);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const filterResults = () => {
        let fList: SparesSelected[] = [];
        if (searchFilter.value.length === 0) {
            sparesFullList.forEach((spare) => {
                fList.push({ ...spare, quantity: 0 });
            });
        } else if (searchFilter.type === 0) {
            sparesFullList.forEach((spare) => {
                if (spare.part_no.toLowerCase().includes(searchFilter.value.toLowerCase())) {
                    fList.push({ ...spare, quantity: 0 });
                }
            });
        } else {
            sparesFullList.forEach((spare) => {
                if (spare.name.toLowerCase().includes(searchFilter.value.toLowerCase())) {
                    fList.push({ ...spare, quantity: 0 });
                }
            });
        }
        setSparesFiltered(fList);
        setNumResults(fList.length);
    };

    const usedInputHandler = (inputValue: number, index: number) => {
        let updatedSparesFiltered = [...sparesFiltered];
        updatedSparesFiltered[index].quantity = inputValue;
        setSparesFiltered(updatedSparesFiltered);
    };

    const removeUsedHandler = (e: React.MouseEvent<HTMLElement>, id: number) => {
        e.preventDefault();
        // change spares used to have 0 of this item
        const i = sparesSelected.findIndex((x) => x.id === id);
        const filtered = sparesSelected.filter((item) => item.id != id);
        setSparesSelected(() => [...filtered, { id: sparesSelected[i].id, name: sparesSelected[i].name, part_no: sparesSelected[i].part_no, quantity: 0 }]);
    };

    const usedInputClick = (index: number, e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const spareToUpdate = sparesFiltered[index];
        const indexOfMatch = sparesSelected.findIndex((x) => x.id === spareToUpdate.id);
        if (indexOfMatch != -1) {
            const filtered = sparesSelected.filter((item) => item.id != spareToUpdate.id);
            setSparesSelected((prev) => [
                ...filtered,
                {
                    id: spareToUpdate.id,
                    part_no: spareToUpdate.part_no,
                    name: spareToUpdate.name,
                    quantity: prev[indexOfMatch].quantity + spareToUpdate.quantity,
                },
            ]);
        } else {
            setSparesSelected((prev) => [...prev, { id: spareToUpdate.id, part_no: spareToUpdate.part_no, name: spareToUpdate.name, quantity: spareToUpdate.quantity }]);
        }
        const filteredFilterList = sparesFiltered.filter((item) => item.id != spareToUpdate.id);
        const filterListUnordered = [...filteredFilterList, { id: spareToUpdate.id, part_no: spareToUpdate.part_no, name: spareToUpdate.name, quantity: 0 }];
        filterListUnordered.sort((a, b) => b.part_no.localeCompare(a.part_no));
        setSparesFiltered(filterListUnordered);
    };

    const SubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.passbackDetails(sparesSelected);
        props.closeModal();
    };

    let showSparesSelected: JSX.Element[] | JSX.Element;
    if (sparesSelected === undefined || sparesSelected.length === 0) {
        showSparesSelected = <div>None</div>;
    } else {
        showSparesSelected = sparesSelected.map((i) => (
            <div key={i.id} className={`flex flex-row border-2 border-primary rounded-md mb-2 w-fit px-2 ${i.quantity < 1 ? 'hidden' : ''}`}>
                <div className="mr-4">{i.part_no}</div>
                <div className="mr-4">{i.name}</div>
                <div className="mr-4">
                    {props.payload.type === 'delivery' ? 'Quantity Ordered:' : 'Quantity Used:'} {i.quantity}
                </div>
                <button
                    onClick={(e) => {
                        removeUsedHandler(e, i.id);
                    }}
                >
                    &#10060;
                </button>
            </div>
        ));
    }

    const showSparesFiltered = sparesFiltered.map((i, index) => (
        <div key={Math.random()} className="flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2">
            <div className="mr-4">{i.part_no}</div>
            <div className="mr-4">{i.name}</div>
            <input
                type="number"
                min="0"
                className="rounded-sm bg-blue-200 my-1 border-2 border-blue-600"
                value={i.quantity}
                onChange={(e) => usedInputHandler(parseInt(e.target.value), index)}
            ></input>
            <button className="text-green text-xl ml-4" onClick={(e) => usedInputClick(index, e)}>
                &#10010;
            </button>
        </div>
    ));

    return (
        <div className="h-full w-full rounded-md relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">{props.payload.type === 'delivery' ? 'Add to Delivery' : 'Spares Used'}</h1>
            <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <DataTable data={sparesFullList} config={usedConfig} />

                <SparesSearch searchFilter={searchFilter} setSearchFilter={setSearchFilter} />

                <div>{props.payload.type === 'delivery' ? 'Items Ordered:' : 'Spares Used:'}</div>
                <div className="mb-5 mt-1">{showSparesSelected}</div>

                <div className="mb-5">
                    <div>Search Results</div>
                    <div className="flex flex-row items-center hover:text-accent transition-all hover:cursor-pointer select-none" onClick={() => setShowRes(!showRes)}>
                        <FontAwesomeIcon icon={faCaretRight} className={`mr-1 w-3 transition-all ${showRes ? 'rotate-90' : null}`} />
                        <div>{numResults} Results</div>
                    </div>
                    {showRes ? <div>{showSparesFiltered}</div> : null}
                </div>
                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button className="rounded-md bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                        Cancel
                    </button>
                    <button className="rounded-md bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={(e) => SubmitHandler(e)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SparesSelector;
