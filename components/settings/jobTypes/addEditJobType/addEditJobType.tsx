import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormHeader from '../../../forms/formHeader';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import { useAddEditJobType } from './useAddEditJobType';
import { addEditJobTypeHandler } from './addEditJobTypeHandler';
import { yupResolverAddEditJobType } from './addEditJobTypeValidation';
import LoadingNoDataError from '../../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditJobType = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditJobType({ jobTypeNumber: props.payload.id });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditJobType,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditJobTypeHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <LoadingNoDataError loading={loading} error={error}>
            <FormContainer>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + defaultValues.value : 'Add Job Type'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Value" type="text" formName="value" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Order" type="number" formName="listPriority" errors={errors} required={true} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </FormContainer>
        </LoadingNoDataError>
    );
};

export default AddEditJobType;
