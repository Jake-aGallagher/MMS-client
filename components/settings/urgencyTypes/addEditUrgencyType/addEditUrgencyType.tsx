import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormHeader from '../../../forms/formHeader';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import { useAddEditUrgencyType } from './useAddEditUrgencyType';
import { addEditUrgencyTypeHandler } from './addEditUrgencyTypeHandler';
import { yupResolverAddEditUrgencyType } from './addEditUrgencyTypeValidation';
import LoadingNoDataError from '../../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditUrgencyType = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditUrgencyType({ urgencyTypeNumber: props.payload.id });
    const periodOptions = [
        { id: 'DAY', value: 'DAY' },
        { id: 'MONTH', value: 'MONTH' },
        { id: 'YEAR', value: 'YEAR' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditUrgencyType,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditUrgencyTypeHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + defaultValues.value : 'Add Urgency Type'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Value" type="text" formName="value" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Urgency Time" type="number" formName="urgencyNumber" errors={errors} required={true} min={0} />
                    <GeneralFormInput
                        register={register}
                        label="Urgency Period"
                        type="select"
                        formName="urgencyPeriod"
                        errors={errors}
                        required={true}
                        optionNameString="value"
                        selectOptions={periodOptions}
                    />
                    <GeneralFormInput register={register} label="Order" type="number" formName="listPriority" errors={errors} required={true} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditUrgencyType;
