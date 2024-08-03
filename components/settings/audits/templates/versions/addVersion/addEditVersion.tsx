import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../../forms/generalFormInput';
import FormHeader from '../../../../../forms/formHeader';
import FormContainer from '../../../../../forms/formContainer';
import GeneralForm from '../../../../../forms/generalForm';
import LoadingNoDataError from '../../../../../loading/loadingNoDataError';
import { useAddEditVersion } from './useAddEditVersion';
import { yupResolverAddEditVersion } from './addEditversionValidation';
import { addEditVersionHandler } from './addEditVersionHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; };
}

const AddEditAuditVersion = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditVersion(props.payload.id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditVersion,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditVersionHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label="Add Version" />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditAuditVersion;
