import FormContainer from '../forms/formContainer';
import LoadingNoDataError from '../loading/loadingNoDataError';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../utility/routing/addressAPI';
import { changeFacility } from './changeFacility';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { GlobalDebug } from '../utility/debug/globalDebug';

interface AvailProps {
    id: number;
    name: string;
}

interface Props {
    closeModal: () => void;
}

const FacilityPicker = (props: Props) => {
    const userId = useSelector((state: RootState) => state.user.value.id);
    const dispatch = useDispatch();
    const [facilities, setFacilities] = useState<AvailProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getFacilities();
    }, []);

    const getFacilities = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/facilities/availabletouser`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('FacilityPicker/getFacilities', [['response', response]]);
            setFacilities(response.data.allFacilities);
            setError(false);
            setLoading(false);
        } catch (err) {
            GlobalDebug('FacilityPicker/getFacilities', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const facilityChange = async (id: number) => {
        await changeFacility(dispatch, userId, id);
        props.closeModal();
    };

    const facilitySelection = facilities.map((p) => (
        <div key={p.id} className="hover:outline-dashed outline-1 outline-accent rounded-md pl-2 flex flex-row items-center mb-4">
            <div>{p.name}</div>
            <button onClick={() => facilityChange(p.id)} className="btnBlue w-20 ml-auto h-8">
                Select
            </button>
        </div>
    ));

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={'Change Facility'} />
                <div className="flex flex-col px-4 pt-8 overflow-y-auto h-[calc(100%-104px)]">{facilitySelection}</div>
                <GeneralFormSubmit closeModal={props.closeModal} cancelOnly={true} />
            </LoadingNoDataError>
        </FormContainer>
    );
};
export default FacilityPicker;
