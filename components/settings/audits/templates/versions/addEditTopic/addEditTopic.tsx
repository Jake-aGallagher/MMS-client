import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../../forms/generalFormInput';
import FormHeader from '../../../../../forms/formHeader';
import FormContainer from '../../../../../forms/formContainer';
import GeneralForm from '../../../../../forms/generalForm';
import LoadingNoDataError from '../../../../../loading/loadingNoDataError';
import { useAddEditTopic } from './useAddEditTopic';
import { yupResolverAddEditTopic } from './addEditTopicValidation';
import { addEditTopicHandler } from './addEditTopicHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; templateId: number; version: number };
}

const AddEditAuditTopic = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditTopic(props.payload.id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditTopic,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditTopicHandler(data, props.payload.id, props.payload.templateId, props.payload.version, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + defaultValues.title : 'Add Topic'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Order" type="number" formName="sortOrder" errors={errors} required={true} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditAuditTopic;
