import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormHeader from '../../../forms/formHeader';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import { useAddEditStatusType } from './useAddEditStatusType';
import { addEditStatusTypeHandler } from './addEditStatusTypeHandler';
import { yupResolverAddEditStatusType } from './addEditStatusTypeValidation';
import LoadingNoDataError from '../../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditStatusType = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditStatusType({ statusTypeNumber: props.payload.id });
    const completionOptions = [
        { id: '0', value: 'No' },
        { id: '1', value: 'Yes' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditStatusType,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditStatusTypeHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + defaultValues.value : 'Add Status Type'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Value" type="text" formName="value" errors={errors} required={true} />
                    <GeneralFormInput
                        register={register}
                        label="Allow Job/PM Completion"
                        type="select"
                        formName="canComplete"
                        errors={errors}
                        required={true}
                        optionNameString="value"
                        selectOptions={completionOptions}
                    />
                    <GeneralFormInput register={register} label="Order" type="number" formName="listPriority" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Set as Initial Status on Job/PM Creation" type="checkbox" formName="initialStatus" errors={errors} required={true} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditStatusType;
