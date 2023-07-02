import { useEffect, useMemo, useState } from 'react';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditEnum = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const alertString = `There has been an issue ${props.payload.id > 0 ? 'editing' : 'creating'} this Enum, please try again.`;
    const [allTypes, setAllTypes] = useState<{ id: number; type: string }[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        type: 1,
        order: 0,
        effectOne: 0,
        effectTwo: 'DAY',
    });

    const formValidation = yup.object().shape({
        name: yup.string().required().max(45),
        type: yup.number().required(),
        order: yup.number().required(),
        effectOne: yup.number(),
        effectTwo: yup.string(),
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const watchType = watch(['type']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    useEffect(() => {
        if (props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(true);
            getEnumTypes();
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enums/edit/${props.payload.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAllTypes(response.data.enumTypes);
            const data = response.data.chosenEnum[0];
            setDefaultValues({
                name: data.value,
                type: data.enum_type_id,
                order: data.list_priority,
                effectOne: data.payload ? data.payload : defaultValues.effectOne,
                effectTwo: data.payload_two ? data.payload_two : defaultValues.effectTwo,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const getEnumTypes = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enums/types`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAllTypes(response.data.enumTypes);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/enums`,
                {
                    id: props.payload.id ? props.payload.id : 0,
                    value: data.name,
                    enumTypeId: data.type,
                    listPriority: data.order,
                    payload: data.effectOne,
                    payloadTwo: data.effectTwo,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
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
            {loading ? (
                <Loading />
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">
                        {props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Add Enum'}
                    </h1>
                    <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <label>Name: </label>
                        <input
                            type="text"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.name && 'border-red-600 border-2'}`}
                            {...register('name', { required: true })}
                        />
                        <label>Type: </label>
                        <select
                            id="type"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.type && 'border-red-600 border-2'}`}
                            {...register('type', { required: true })}
                        >
                            {allTypes.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.type}
                                </option>
                            ))}
                        </select>
                        <label>Order: </label>
                        <input
                            type="number"
                            className={`mb-2 rounded-sm bg-blue-200 ${errors.order && 'border-red-600 border-2'}`}
                            {...register('order', { required: true })}
                        />

                        {watchType[0] == 1 ? (
                            <>
                                <label>Response Required Within: </label>
                                <span className="flex flex-row justify-start">
                                    <input
                                        type="number"
                                        className={`mb-2 rounded-sm bg-blue-200 ${errors.effectOne && 'border-red-600 border-2'}`}
                                        {...register('effectOne', { required: true })}
                                    />
                                    <select
                                        className={`mb-2 ml-4 px-2 rounded-sm bg-blue-200 ${errors.effectTwo && 'border-red-600 border-2'}`}
                                        {...register('effectTwo', { required: true })}
                                    >
                                        <option value={'DAY'}>DAY</option>
                                        <option value={'WEEK'}>WEEK</option>
                                        <option value={'MONTH'}>MONTH</option>
                                        <option value={'YEAR'}>YEAR</option>
                                    </select>
                                </span>
                            </>
                        ) : null}

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

export default AddEditEnum;
