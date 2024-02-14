import FormContainer from '../forms/formContainer';
import LoadingNoDataError from '../loading/loadingNoDataError';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { changeProperty } from './changeProperty';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface AvailProps {
    id: number;
    name: string;
}

interface Props {
    closeModal: () => void;
}

const PropertyPicker = (props: Props) => {
    const userId = useSelector((state: RootState) => state.user.value.id);
    const dispatch = useDispatch();
    const [properties, setProperties] = useState<AvailProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getProperties();
    }, []);

    const getProperties = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/availabletouser`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setProperties(response.data.allProps);
            setError(false);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const propertyChange = async (id: number) => {
        await changeProperty(dispatch, userId, id);
        props.closeModal();
    }

    const propertySelection = properties.map((p) => (
        <div key={p.id} className="hover:outline-dashed outline-1 outline-accent rounded-md pl-2 flex flex-row items-center mb-4">
            <div>{p.name}</div>
            <button onClick={() => propertyChange(p.id)} className="btnBlue w-20 ml-auto h-8">Select</button>
        </div>
    ));

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={'Change Property'} />
                <div className="flex flex-col px-4 pt-8 overflow-y-auto h-[calc(100%-104px)]">{propertySelection}</div>
                <GeneralFormSubmit closeModal={props.closeModal} cancelOnly={true} />
            </LoadingNoDataError>
        </FormContainer>
    );
};
export default PropertyPicker;
