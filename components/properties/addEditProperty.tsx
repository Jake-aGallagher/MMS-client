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

interface ModalProps {
    closeModal: () => void;
    propertyNumber: number;
}

const AddEditProperty = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const alertString = `There has been an issue ${props.propertyNumber > 0 ? 'editing' : 'creating'} this Property, please try again.`;
    const [id, setId] = useState(props.propertyNumber);
    const typeOptions = ['Factory', 'Commercial', 'Power station', 'Misc'];
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
                dispatch(
                    setCurrentProperty({
                        currentProperty: response.data.newPropId,
                    })
                );
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
                    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">
                        {props.propertyNumber > 0 ? 'Edit ' + name : 'Add Property'}
                    </h1>
                    <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <label>Property Name</label>
                        <input
                            type="text"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.propertyName && 'border-red-600 border-2'}`}
                            {...register('propertyName', { required: true })}
                        />
                        <label>Type</label>
                        <select
                            id="type"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.type && 'border-red-600 border-2'}`}
                            {...register('type', { required: true })}
                        >
                            {typeOptions.map((typeOption) => (
                                <option value={typeOption} key={typeOption}>
                                    {typeOption}
                                </option>
                            ))}
                        </select>
                        <label>Address</label>
                        <input
                            type="text"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.address && 'border-red-600 border-2'}`}
                            {...register('address', { required: true })}
                        />
                        <label>City</label>
                        <input
                            type="text"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.city && 'border-red-600 border-2'}`}
                            {...register('city', { required: true })}
                        />
                        <label>County</label>
                        <input
                            type="text"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.county && 'border-red-600 border-2'}`}
                            {...register('county', { required: true })}
                        />
                        <label>Postcode</label>
                        <input
                            type="text"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.postcode && 'border-red-600 border-2'}`}
                            {...register('postcode', { required: true })}
                        />
                        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                            <button
                                className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                                onClick={(e) => [e.preventDefault(), props.closeModal()]}
                            >
                                Cancel
                            </button>
                            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddEditProperty;
