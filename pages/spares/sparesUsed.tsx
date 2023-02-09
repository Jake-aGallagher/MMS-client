import { useState, useEffect } from 'react';
import axios from 'axios';
import GreaterThan from '../../public/GreaterThan.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { JsxElement } from 'typescript';

interface ModalProps {
    closeModal: () => void;
    payload: { jobId: number; sparesUsed: SparesUsed[] };
    passbackDetails: (usedSparesArray: Spare[]) => void;
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
}

interface SparesUsed extends Spare {
    num_used: number;
}

const SparesUsed = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [sparesFullList, setSparesFullList] = useState<Spare[]>([]);
    const [sparesFiltered, setSparesFiltered] = useState<SparesUsed[]>([]);
    const [sparesUsed, setSparesUsed] = useState<SparesUsed[]>([]);
    const [chosenFilter, setChosenFilter] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRes, setShowRes] = useState(false);
    const [numResults, setNumResults] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        setSparesUsed(props.payload.sparesUsed);
        getHandler();
    }, []);

    useEffect(() => {
        filterResults();
    }, [sparesFullList, chosenFilter, searchTerm]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares-for-use/${currentProperty}/${props.payload.jobId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setNumResults(response.data.spares.length);
            if (response.data.spares.length === 0) {
                setNoData(true);
            } else {
                setSparesFullList(response.data.spares);
                if (response.data.usedSpares.length > 0) {
                    setSparesUsed(response.data.usedSpares);
                }
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const filterResults = () => {
        let fList: SparesUsed[] = [];
        if (searchTerm.length === 0) {
            sparesFullList.forEach((spare) => {
                fList.push({ ...spare, num_used: 0 });
            });
        } else if (chosenFilter === 0) {
            sparesFullList.forEach((spare) => {
                if (spare.part_no.toLowerCase().includes(searchTerm.toLowerCase())) {
                    fList.push({ ...spare, num_used: 0 });
                }
            });
        } else {
            sparesFullList.forEach((spare) => {
                if (spare.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    fList.push({ ...spare, num_used: 0 });
                }
            });
        }
        setSparesFiltered(fList);
        setNumResults(fList.length);
    };

    const usedInputHandler = (inputValue: number, index: number) => {
        let updatedSparesFiltered = [...sparesFiltered];
        updatedSparesFiltered[index].num_used = inputValue;
        setSparesFiltered(updatedSparesFiltered);
    };

    const removeUsedHandler = (e: React.MouseEvent<HTMLElement>, id: number) => {
        e.preventDefault();
        // change spares used to have 0 of this item
        const i = sparesUsed.findIndex((x) => x.id === id);
        const filtered = sparesUsed.filter((item) => item.id != id);
        setSparesUsed(() => [...filtered, { id: sparesUsed[i].id, name: sparesUsed[i].name, part_no: sparesUsed[i].part_no, num_used: 0 }]);
    };

    const usedInputClick = (index: number, e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const spareToUpdate = sparesFiltered[index];
        const indexOfMatch = sparesUsed.findIndex((x) => x.id === spareToUpdate.id);
        if (indexOfMatch != -1) {
            const filtered = sparesUsed.filter((item) => item.id != spareToUpdate.id);
            setSparesUsed((prev) => [
                ...filtered,
                {
                    id: spareToUpdate.id,
                    part_no: spareToUpdate.part_no,
                    name: spareToUpdate.name,
                    num_used: prev[indexOfMatch].num_used + spareToUpdate.num_used,
                },
            ]);
        } else {
            setSparesUsed((prev) => [
                ...prev,
                { id: spareToUpdate.id, part_no: spareToUpdate.part_no, name: spareToUpdate.name, num_used: spareToUpdate.num_used },
            ]);
        }
        const filteredFilterList = sparesFiltered.filter((item) => item.id != spareToUpdate.id);
        const filterListUnordered = [...filteredFilterList, { id: spareToUpdate.id, part_no: spareToUpdate.part_no, name: spareToUpdate.name, num_used: 0 }];
        filterListUnordered.sort((a, b) => b.part_no.localeCompare(a.part_no));
        setSparesFiltered(filterListUnordered);
    };

    const SubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.passbackDetails(sparesUsed);
        props.closeModal();
    };

    let showSparesUsed: JSX.Element[] | JSX.Element;
    if (sparesUsed === undefined || sparesUsed.length === 0) {
        showSparesUsed = <div>None</div>;
    } else {
        showSparesUsed = sparesUsed.map((i) => (
            <div key={i.id} className={`flex flex-row border-2 border-blue-600 rounded-md mb-2 w-fit px-2 ${i.num_used < 1 ? 'hidden' : ''}`}>
                <div className="mr-4">{i.part_no}</div>
                <div className="mr-4">{i.name}</div>
                <div className="mr-4">Quantity Used: {i.num_used}</div>
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
                value={i.num_used}
                onChange={(e) => usedInputHandler(parseInt(e.target.value), index)}
            ></input>
            <button className="text-green-600 text-xl ml-4" onClick={(e) => usedInputClick(index, e)}>
                &#10010;
            </button>
        </div>
    ));

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Spares Used</h1>
            <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <label htmlFor="searchInput" className="mb-2">
                    Spares Search
                </label>
                <div className="flex flex-row mb-5">
                    <select
                        id="selectBy"
                        className="rounded-sm bg-blue-200 mr-2"
                        value={chosenFilter}
                        onChange={(e) => setChosenFilter(parseInt(e.target.value))}
                    >
                        <option value={0}>Part Number / ID</option>
                        <option value={1}>Part Name</option>
                    </select>
                    <input
                        id="searchInput"
                        type="text"
                        className="rounded-sm bg-blue-200 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div
                        className="ml-2 rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 border-2 border-blue-600 hover:border-transparent"
                        onClick={(e) => [e.preventDefault(), setSearchTerm('')]}
                    >
                        Clear
                    </div>
                </div>
                <div>Spares Used:</div>
                <div className="mb-5 mt-1">{showSparesUsed}</div>

                <div className="mb-5">
                    <div>Search Results</div>
                    <div
                        className="flex flex-row items-center hover:text-blue-600 icon-filter hover:cursor-pointer select-none"
                        onClick={() => setShowRes(!showRes)}
                    >
                        <img className={`mr-1 h-5 w-5 font-bold text-2xl duration-150 ${showRes ? 'rotate-90' : null}`} src={GreaterThan.src} />
                        <div>{numResults} Results</div>
                    </div>
                    {showRes ? <div>{showSparesFiltered}</div> : null}
                </div>
                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button
                        className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                        onClick={(e) => [e.preventDefault(), props.closeModal()]}
                    >
                        Cancel
                    </button>
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={(e) => SubmitHandler(e)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SparesUsed;
