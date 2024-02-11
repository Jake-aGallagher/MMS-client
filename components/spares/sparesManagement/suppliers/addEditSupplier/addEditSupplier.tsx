import { useEffect, useMemo } from 'react';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../../forms/formHeader';
import GeneralFormSubmit from '../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../forms/generalFormInput';
import FormContainer from '../../../../forms/formContainer';
import GeneralForm from '../../../../forms/generalForm';
import LoadingNoDataError from '../../../../loading/loadingNoDataError';
import { useAddEditSupplier } from './useAddEditSupplier';
import { yupResolverAddEditSupplier } from './addEditSupplierValidation';
import { addEditSupplierHandler } from './addEditSupplierHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditSupplier = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditSupplier(props.payload.id);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditSupplier,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditSupplierHandler(data, currentProperty, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.name.length > 0 ? 'Edit ' + props.payload.name : 'Add Supplier'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Name" type="text" formName="name" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Website" type="text" formName="website" errors={errors} />
                    <GeneralFormInput register={register} label="Phone" type="text" formName="phone" errors={errors} />
                    <GeneralFormInput register={register} label="Primary Contact" type="text" formName="primContact" errors={errors} />
                    <GeneralFormInput register={register} label="Primary Contact Phone" type="text" formName="primContactPhone" errors={errors} />
                    <GeneralFormInput register={register} label="Address" type="text" formName="address" errors={errors} />
                    <GeneralFormInput register={register} label="City" type="text" formName="city" errors={errors} />
                    <GeneralFormInput register={register} label="County" type="text" formName="county" errors={errors} />
                    <GeneralFormInput register={register} label="Postcode" type="text" formName="postcode" errors={errors} />
                    <GeneralFormInput register={register} label="Supplies" type="text" formName="supplies" errors={errors} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditSupplier;
