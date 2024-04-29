import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormHeader from '../../forms/formHeader';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import { useAddEditFacility } from './useAddEditFacility';
import { addEditFacilityHandler } from './addEditFacilityHandler';
import { useDispatch } from 'react-redux';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import { FieldInputs } from '../../settings/customFields/fieldInputs';

interface ModalProps {
    closeModal: () => void;
    facilityNumber: number;
}

const AddEditFacility = (props: ModalProps) => {
    const dispatch = useDispatch();
    const { defaultValues, customFields, id, loading, error } = useAddEditFacility({ facilityNumber: props.facilityNumber });

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
        await addEditFacilityHandler(data, id, props.closeModal, dispatch, props.facilityNumber);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.facilityNumber > 0 ? 'Edit ' + defaultValues.facilityName : 'Add Facility'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Facility Name" type="text" formName="facilityName" errors={errors} required={true} />
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

export default AddEditFacility;
