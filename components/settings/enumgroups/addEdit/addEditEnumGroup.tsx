import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormHeader from '../../../forms/formHeader';
import GeneralForm from '../../../forms/generalForm';
import FormContainer from '../../../forms/formContainer';
import { useAddEditEnumGroups } from './useAddEditEnumGroups';
import { addEditEnumGroupHandler } from './addEditEnumGroupHandler';
import { yupResolverEnumGroups } from './addEditEnumGroupValidation';
import LoadingNoDataError from '../../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditEnumGroup = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditEnumGroups({ id: props.payload.id });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverEnumGroups,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditEnumGroupHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Add Enum Group'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Group Name" type="text" formName="name" errors={errors} required={true} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditEnumGroup;
