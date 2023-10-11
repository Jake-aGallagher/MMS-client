import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LoadingNoDataError from '../loading/loadingNoDataError';
import FormContainer from '../forms/formContainer';
import FormHeader from '../forms/formHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    closeModal: () => void;
    payload: { sparesSelected: SparesSelected[]; type: string };
    passbackDetails: (usedSparesArray: SparesSelected[]) => void;
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
}

interface SparesSelected extends Spare {
    quantity: number;
}

const NewSparesSelector = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [spareslist, setSparesList] = useState<SparesSelected[]>([]);

    useEffect(() => {
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares-for-use/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            mergeArrays(response.data.spares);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const mergeArrays = (fullSparesList: Spare[]) => {
        const idListInUse: {[key: number]: true|undefined} = {};
        const mergedList: SparesSelected[] = [];

        props.payload.sparesSelected.forEach((item) => {
            idListInUse[item.id] = true;
        });
        fullSparesList.forEach((item) => {
            if (idListInUse[item.id] == undefined) {
                mergedList.push({ ...item, quantity: 0 });
            }
        });
        setSparesList(mergedList);
        setLoading(false);
    };

    const headers = ['Part Number', 'Name', 'Add'];
    const headersHtml = headers.map((header) => <th className="font-semibold" key={'current_item_header_' + header}>{header}</th>);

    const updateSparesSelected = (item: SparesSelected) => {
        props.passbackDetails([...props.payload.sparesSelected, {...item, quantity: 1}]);
        props.closeModal();
    };

    const showCurrent = spareslist.map((item) => (
        <tr className="odd:bg-secAlt even:bg-secondary" key={'current_item_' + item.id}>
            <td className="text-center">{item.part_no}</td>
            <td className="text-center">{item.name}</td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(item)}>
                <FontAwesomeIcon icon={faPlus} className="h-5 m-auto" />
            </td>
        </tr>
    ));

    return (
        <LoadingNoDataError loading={loading} error={error}>
            <FormContainer>
                <FormHeader label={props.payload.type === 'delivery' ? 'Add to Delivery' : 'Spares Used'} />
                <div className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                    <div className="w-full relative">
                        <div className="overflow-x-auto rounded-xl shadow-lg">
                            <table className="w-full table-auto bg-secondary">
                                <thead><tr>{headersHtml}</tr></thead>
                                <tbody>{showCurrent}</tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-row justify-end items-center absolute bottom-0 h-16 left-0 w-full">
                        <button className="btnBlue h-8 mr-4 px-4 w-32" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                            Cancel
                        </button>
                    </div>
                </div>
            </FormContainer>
        </LoadingNoDataError>
    );
};

export default NewSparesSelector;
