import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormHeader from '../../forms/formHeader';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import { useAddEditProperty } from './useAddEditProperty';
import { yupResolverAddEditProperty } from './addEditPropertyValidation';
import { addEditPropertyHandler } from './addEditPropertyHandler';
import { useDispatch } from 'react-redux';
import LoadingNoDataError from '../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    propertyNumber: number;
}

const AddEditProperty = (props: ModalProps) => {
    const dispatch = useDispatch();
    const { defaultValues, id, loading, error } = useAddEditProperty({ propertyNumber: props.propertyNumber });
    const typeOptions = [
        { id: 'Factory', value: 'Factory' },
        { id: 'Commercial', value: 'Commercial' },
        { id: 'Power station', value: 'Power station' },
        { id: 'Misc', value: 'Misc' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditProperty,
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
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <FormContainer>
                    <FormHeader label={props.propertyNumber > 0 ? 'Edit ' + defaultValues.propertyName : 'Add Property'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        <GeneralFormInput register={register} label="Facility Name" type="text" formName="propertyName" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Type" type="select" formName="type" errors={errors} required={true} optionNameString="value" selectOptions={typeOptions} />
                        <GeneralFormInput register={register} label="Address" type="text" formName="address" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="City" type="text" formName="city" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="County" type="text" formName="county" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Postcode" type="text" formName="postcode" errors={errors} required={true} />
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </GeneralForm>
                </FormContainer>
            </LoadingNoDataError>
        </>
    );
};

export default AddEditProperty;
