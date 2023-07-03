import { useEffect, useMemo, useState } from 'react';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';
import FormHeader from '../forms/formHeader';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditEnum = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const alertString = `There has been an issue ${props.payload.id > 0 ? 'editing' : 'creating'} this Enum, please try again.`;
    const responsePeriods = [
        { id: 'DAY', value: 'DAY' },
        { id: 'WEEK', value: 'WEEK' },
        { id: 'MONTH', value: 'MONTH' },
        { id: 'YEAR', value: 'YEAR' },
    ];
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
                    <FormHeader label={props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Add Enum'} />
                    <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <GeneralFormInput register={register} label="Name" type="text" formName="name" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Order" type="number" formName="order" errors={errors} required={true} min={0} />
                        <GeneralFormInput register={register} label="Type" type="select" formName="type" errors={errors} required={true} optionNameString="type" selectOptions={allTypes} />
                        {watchType[0] == 1 ? (
                            <>
                                <label>Response Required Within: </label>
                                <span className="flex flex-row justify-start">
                                    <GeneralFormInput register={register} type="number" formName="effectOne" errors={errors} required={true} min={0} />
                                    <GeneralFormInput
                                        register={register}
                                        type="select"
                                        formName="effectTwo"
                                        errors={errors}
                                        required={true}
                                        optionNameString="value"
                                        selectOptions={responsePeriods}
                                        extraClasses="ml-4 px-2"
                                    />
                                </span>
                            </>
                        ) : null}
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </form>
                </div>
            )}
        </>
    );
};

export default AddEditEnum;
