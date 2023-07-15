import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { SERVER_URL } from '../../../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../forms/formHeader';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import LoadingNoDataError from '../../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditSupplier = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const alertString = `There has been an issue ${props.payload.id > 0 ? 'editing' : 'creating'} this Note, please try again.`;
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [name, setName] = useState('');
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        website: '',
        phone: '',
        primContact: '',
        primContactPhone: '',
        address: '',
        city: '',
        county: '',
        postcode: '',
        supplies: '',
    });

    const formValidation = yup.object().shape({
        name: yup.string().required().max(255),
        website: yup.string().url(),
        phone: yup.string().max(25),
        primContact: yup.string().max(255),
        primContactPhone: yup.string().max(25),
        address: yup.string().max(255),
        city: yup.string().max(255),
        county: yup.string().max(255),
        postcode: yup.string().max(255),
        supplies: yup.string().max(255),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        if (props.payload && props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/supplier/${props.payload?.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const supply = response.data[0];
            if (supply.length === 0) {
                setError(true);
            } else {
                setDefaultValues({
                    name: supply.name,
                    website: supply.website,
                    phone: supply.phone,
                    primContact: supply.prim_contact,
                    primContactPhone: supply.prim_contact_phone,
                    address: supply.address,
                    city: supply.city,
                    county: supply.county,
                    postcode: supply.postcode,
                    supplies: supply.supplies,
                });
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/spares/supplier`,
                {
                    propertyId: currentProperty,
                    id: props.payload.id,
                    name: data.name,
                    website: data.website,
                    phone: data.phone,
                    primContact: data.primContact,
                    primContactPhone: data.primContactPhone,
                    address: data.address,
                    city: data.city,
                    county: data.county,
                    postcode: data.postcode,
                    supplies: data.supplies,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert(alertString);
            }
        } catch (err) {
            alert(alertString);
        }
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <FormContainer>
                    <FormHeader label={props.payload.name.length > 0 ? 'Edit ' + props.payload.name : 'Add Supplier'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        <GeneralFormInput register={register} label="Name" type="text" formName="name" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Website" type="text" formName="website" errors={errors} />
                        <GeneralFormInput register={register} label="Phone" type="text" formName="phone" errors={errors} />
                        <GeneralFormInput register={register} label="Primary Contact" type="text" formName="primContact" errors={errors} />
                        <GeneralFormInput register={register} label="Primary Contact Phone" type="text" formName="primContactPhone" errors={errors} />
                        <GeneralFormInput register={register} label="Address" type="text" formName="address" errors={errors} />
                        <GeneralFormInput register={register} label="City" type="text" formName="city" errors={errors} />
                        <GeneralFormInput register={register} label="County" type="text" formName="county" errors={errors} />
                        <GeneralFormInput register={register} label="Postcode" type="text" formName="postcode" errors={errors} />
                        <GeneralFormInput register={register} label="Supplies" type="text" formName="supplies" errors={errors} />
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </GeneralForm>
                </FormContainer>
            </LoadingNoDataError>
        </>
    );
};

export default AddEditSupplier;
