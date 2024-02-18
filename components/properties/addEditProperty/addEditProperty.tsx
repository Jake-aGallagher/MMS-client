import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormHeader from '../../forms/formHeader';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import { useAddEditProperty } from './useAddEditProperty';
import { addEditPropertyHandler } from './addEditPropertyHandler';
import { useDispatch } from 'react-redux';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import { FieldInputs } from '../../settings/customFields/fieldInputs';

interface ModalProps {
    closeModal: () => void;
    propertyNumber: number;
}

const AddEditProperty = (props: ModalProps) => {
    const dispatch = useDispatch();
    const { defaultValues, customFields, id, loading, error } = useAddEditProperty({ propertyNumber: props.propertyNumber });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditPropertyHandler(data, id, props.closeModal, dispatch, props.propertyNumber);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.propertyNumber > 0 ? 'Edit ' + defaultValues.propertyName : 'Add Property'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Facility Name" type="text" formName="propertyName" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Address" type="text" formName="address" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="City" type="text" formName="city" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="County" type="text" formName="county" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Postcode" type="text" formName="postcode" errors={errors} required={true} />
                    {FieldInputs(customFields, register, errors, setValue)}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditProperty;
