import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../forms/generalFormInput';
import FormHeader from '../../../../forms/formHeader';
import GeneralForm from '../../../../forms/generalForm';
import FormContainer from '../../../../forms/formContainer';
import LoadingNoDataError from '../../../../loading/loadingNoDataError';
import { yupResolverEnumValues } from './addEditEnumValueValidation';
import { useAddEditEnumValues } from './useAddEditEnumValue';
import { addEditEnumValueHandler } from './addEditEnumValueHandler';
import { useRouter } from 'next/router';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; };
}

const AddEditEnumValue = (props: ModalProps) => {
    const params = useRouter();
    const enumGroupId = parseInt(params.asPath.split('/')[3]);
    const { defaultValues, loading, error } = useAddEditEnumValues({ id: props.payload.id });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverEnumValues,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditEnumValueHandler(data, props.payload.id, enumGroupId, props.closeModal);
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <FormContainer>
                    <FormHeader label={props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Add Enum Group'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        <GeneralFormInput register={register} label="Value" type="text" formName="name" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Order" type="number" formName="order" errors={errors} required={true} />
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </GeneralForm>
                </FormContainer>
            </LoadingNoDataError>
        </>
    );
};

export default AddEditEnumValue;
