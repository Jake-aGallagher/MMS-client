import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import { SERVER_URL } from '../routing/addressAPI';
import { setCurrentProperty } from '../store/propertySlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';
import FormHeader from '../forms/formHeader';

interface ModalProps {
    closeModal: () => void;
    propertyNumber: number;
}

const AddEditProperty = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const alertString = `There has been an issue ${props.propertyNumber > 0 ? 'editing' : 'creating'} this Property, please try again.`;
    const [id, setId] = useState(props.propertyNumber);
    const typeOptions = [
        { id: 'Factory', value: 'Factory' },
        { id: 'Commercial', value: 'Commercial' },
        { id: 'Power station', value: 'Power station' },
        { id: 'Misc', value: 'Misc' },
    ];
    const dispatch = useDispatch();
    const [defaultValues, setDefaultValues] = useState({
        propertyName: '',
        type: 'Factory',
        address: '',
        city: '',
        county: '',
        postcode: '',
    });

    const formValidation = yup.object().shape({
        propertyName: yup.string().required().max(45),
        type: yup.string().required(),
        address: yup.string().required().max(45),
        city: yup.string().required().max(45),
        county: yup.string().required().max(45),
        postcode: yup.string().required().max(45),
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
        if (props.propertyNumber > 0) {
            setLoading(true);
            setError(false);
            getPropertyHandler();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/${props.propertyNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data[0];
            setId(parseInt(data.id));
            setDefaultValues({
                propertyName: data.name,
                type: data.type,
                address: data.address,
                city: data.city,
                county: data.county,
                postcode: data.postcode,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/properties`,
                {
                    id: id,
                    name: data.propertyName,
                    type: data.type,
                    address: data.address,
                    city: data.city,
                    county: data.county,
                    postcode: data.postcode,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                dispatch(setCurrentProperty({ currentProperty: response.data.newPropId }));
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
            {loading ? (
                <Loading />
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <FormHeader label={props.propertyNumber > 0 ? 'Edit ' + defaultValues.propertyName : 'Add Property'} />
                    <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <GeneralFormInput register={register} label="Property Name" type="text" formName="propertyName" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Type" type="select" formName="type" errors={errors} required={true} optionNameString="value" selectOptions={typeOptions} />
                        <GeneralFormInput register={register} label="Address" type="text" formName="address" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="City" type="text" formName="city" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="County" type="text" formName="county" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Postcode" type="text" formName="postcode" errors={errors} required={true} />
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </form>
                </div>
            )}
        </>
    );
};

export default AddEditProperty;
