import { useEffect, useState } from 'react';
import DataTable from '../dataTable/dataTable';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LoadingNoDataError from '../loading/loadingNoDataError';
import FormContainer from '../forms/formContainer';
import FormHeader from '../forms/formHeader';

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

    const tableConfig = {
        headers: [
            { id: 'part_no', name: 'Part Number', type: 'string', nameParam: 'part_no', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'quantity', name: 'Quantity', type: 'number', search: true, order: true },
        ],
        searchable: true,
    };

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
        const idListOfPropsOnes: number[] = [];
        const mergedList: SparesSelected[] = [];

        props.payload.sparesSelected.forEach((item) => {
            idListOfPropsOnes.push(item.id);
            mergedList.push(item);
        });
        fullSparesList.forEach((item) => {
            if (!idListOfPropsOnes.includes(item.id)) {
                mergedList.push({ ...item, quantity: 0 });
            }
        });
        setSparesList(mergedList);
        setLoading(false);
    };

    const updateQuant = () => {

    }

    const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // filter sparesList for any with 0 quantity
        const filtered = spareslist.filter((item) => item.quantity > 0);
        props.passbackDetails(filtered) 
    };

    return (
        <LoadingNoDataError loading={loading} error={error}>
            <FormContainer>
                <FormHeader label={props.payload.type === 'delivery' ? 'Add to Delivery' : 'Spares Used'} />
                <div className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                    <DataTable data={spareslist} config={tableConfig} />

                    <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full">
                        <button className="rounded-md bg-background hover:bg-secondary h-8 px-4  border-2 border-accent hover:border-primary w-32 transition-all" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                            Cancel
                        </button>
                        <button className="rounded-md bg-background hover:bg-secondary h-8 px-4  border-2 border-accent hover:border-primary w-32 transition-all" onClick={(e) => submitHandler(e)}>
                            Submit
                        </button>
                    </div>
                </div>
            </FormContainer>
        </LoadingNoDataError>
    );
};

export default NewSparesSelector;
