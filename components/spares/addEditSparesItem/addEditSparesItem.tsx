import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import { useAddEditSparesItem } from './useAddEditSparesItem';
import { addEditSparesItemHandler } from './addEditSparesItemHandler';
import { FieldInputs } from '../../settings/customFields/fieldInputs';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditSparesItem = (props: ModalProps) => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { defaultValues, customFields, loading, error } = useAddEditSparesItem(props.payload.id, currentFacility);

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
        await addEditSparesItemHandler(data, currentFacility, props.payload.id, props.closeModal, props.payload.name);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.name.length > 0 ? props.payload.name : 'Add Spares Item'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Part Number" type="text" formName="partNo" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Part Name" type="text" formName="name" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="OEM Part Number" type="text" formName="manPartNo" errors={errors} />
                    <GeneralFormInput register={register} label="OEM Part Name" type="text" formName="manName" errors={errors} />
                    <GeneralFormInput register={register} label="Description" type="textarea" formName="description" errors={errors} rows={4} />
                    <GeneralFormInput register={register} label="Notes" type="textarea" formName="notes" errors={errors} rows={4} />
                    <GeneralFormInput register={register} label="Location" type="text" formName="location" errors={errors} />
                    <GeneralFormInput register={register} label="Quantity in Stock" type="number" formName="quantRemaining" errors={errors} min={0} />
                    <GeneralFormInput register={register} label="Supplier" type="text" formName="supplier" errors={errors} />
                    <GeneralFormInput register={register} label="Cost per Item (£)" type="number" formName="cost" errors={errors} min={0} step={'.01'} />
                    {FieldInputs(customFields, register, errors, setValue)}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditSparesItem;
