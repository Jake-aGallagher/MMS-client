import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../../forms/generalFormInput';
import FormHeader from '../../../../../forms/formHeader';
import FormContainer from '../../../../../forms/formContainer';
import GeneralForm from '../../../../../forms/generalForm';
import LoadingNoDataError from '../../../../../loading/loadingNoDataError';
import { useAddEditOption } from './useAddEditOption';
import { yupResolverAddEditOption } from './addEditOptionValidation';
import { addEditOptionHandler } from './addEditOptionHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; questionId: number; };
}

const AddEditAuditOption = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditOption(props.payload.id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditOption,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditOptionHandler(data, props.payload.id, props.payload.questionId, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + defaultValues.title : 'Add Topic'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Order" type="number" formName="sortOrder" errors={errors} required={true} min={0} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditAuditOption;
