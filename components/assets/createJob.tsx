import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import ModalBase from '../modal/modal';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';
import FormContainer from '../forms/formContainer';
import GeneralForm from '../forms/generalForm';

interface ModalProps {
    closeModal: () => void;
    assetId: number;
}

interface TypeOptions {
    id: number;
    value: string;
}

interface UrgencyOptions {
    id: number;
    value: string;
}

const CreateJob = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const userId = useSelector((state: RootState) => state.user.value.id);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [typeOptions, setTypeOptions] = useState<TypeOptions[]>([]);
    const [urgencyOptions, setUrgencyOptions] = useState<UrgencyOptions[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalPayload, setModalPayload] = useState(0);
    const compNowOptions = [
        { id: 'No', value: 'No' },
        { id: 'Yes', value: 'Yes' },
    ];
    const [defaultValues, setDefaultValues] = useState({
        selectedType: '',
        title: '',
        description: '',
        selectedUrgency: '',
        compNow: 'No',
    });

    const formValidation = yup.object().shape({
        selectedType: yup.string().required(),
        title: yup.string().required().max(255),
        description: yup.string().required().max(1000),
        selectedUrgency: yup.string().required(),
        compNow: yup.string().required(),
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
        setLoading(true);
        setError(false);
        setNoData(false);
        getEnums();
    }, []);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const getEnums = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enums/create-job`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setTypeOptions(response.data.types);
            setUrgencyOptions(response.data.urgency);
            setDefaultValues({
                ...defaultValues,
                selectedType: response.data.types[0].id,
                selectedUrgency: response.data.urgency[0].id,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.post(
                `${SERVER_URL}/jobs`,
                {
                    propertyNumber: currentProperty,
                    assetNumber: props.assetId,
                    type: data.selectedType,
                    title: data.title,
                    description: data.description,
                    urgency: data.selectedUrgency,
                    reporter: userId,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created && data.compNow == 'No') {
                props.closeModal();
            } else if (response.data.created && data.compNow == 'Yes') {
                setModalPayload(response.data.jobId);
                setModalType('updateJob');
                setViewModal(true);
            }
        } catch (err) {
            alert('There has been an issue creating this Job, please try again.');
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <>
                    {viewModal ? <ModalBase modalType={modalType} payload={modalPayload} fullSize={true} closeModal={() => [setViewModal(false), props.closeModal()]} /> : ''}
                    <FormContainer>
                        <FormHeader label={'Create New Job'} />
                        <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                            <GeneralFormInput
                                register={register}
                                label="Job Type"
                                type="select"
                                formName="selectedType"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={typeOptions}
                            />
                            <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                            <GeneralFormInput register={register} label="Job Description" type="textarea" formName="description" errors={errors} rows={5} />
                            <GeneralFormInput
                                register={register}
                                label="Urgency"
                                type="select"
                                formName="selectedUrgency"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={urgencyOptions}
                            />
                            <GeneralFormInput
                                register={register}
                                label="Would you like to update and/or complete this Job immediately"
                                type="select"
                                formName="compNow"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={compNowOptions}
                            />
                            <GeneralFormSubmit closeModal={props.closeModal} />
                        </GeneralForm>
                    </FormContainer>
                </>
            )}
            ;
        </>
    );
};

export default CreateJob;
