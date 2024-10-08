import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ModalBase from '../../../layout/modal/modal';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../forms/formHeader';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import LoadingNoDataError from '../../../loading/loadingNoDataError';
import { useCreateJob } from './useCreateJob';
import { yupResolverCreateJob } from './createJobValidation';
import { createJobHandler } from './createJobHandler';
import { FieldInputs } from '../../../settings/customFields/fieldInputs';

interface ModalProps {
    closeModal: () => void;
    assetId: number;
}

const CreateJob = (props: ModalProps) => {
    const { defaultValues, typeOptions, urgencyOptions, loading, error } = useCreateJob();
    const userId = useSelector((state: RootState) => state.user.value.id);
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string, auditType?: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });
    const yesNoOptions = [
        { id: 'No', value: 'No' },
        { id: 'Yes', value: 'Yes' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await createJobHandler({ data, currentFacility, assetId: props.assetId, userId, closeModal: props.closeModal, setModal });
    };

    return (
        <>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } })]} /> : null}
            <FormContainer closeModal={props.closeModal}>
                <LoadingNoDataError loading={loading} error={error}>
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
                            selectOptions={yesNoOptions}
                        />
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </GeneralForm>
                </LoadingNoDataError>
            </FormContainer>
        </>
    );
};

export default CreateJob;
