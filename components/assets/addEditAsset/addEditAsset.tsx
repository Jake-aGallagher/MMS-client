import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import { addEditAssetHandler } from './addEditAssetHandler';
import { useAddEditAsset } from './useAddEditAsset';
import { FieldInputs } from '../../settings/customFields/fieldInputs';
import { useEffect, useMemo } from 'react';
import LoadingNoDataError from '../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { type: 'add' | 'edit'; id: number; name: string; note?: string };
}

const AddEditAsset = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const formLabel = `${props.payload.type == 'add' ? 'Create New Component of' : 'Edit'} ${props.payload.name}`;
    const { defaultValues, customFields, loading, error } = useAddEditAsset(props.payload.type == 'add' ? 0 : props.payload.id);

    const {
        register,
        handleSubmit,
        reset,
        watch,
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

    const watchNote = watch(['note']) as String[];

    const handleRegistration = async (data: any) => {
        await addEditAssetHandler(data, props.payload.type == 'add' ? 'add' : 'edit', props.payload.id, currentProperty, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={formLabel} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Component Name" type="text" formName="name" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Notes" type="textarea" formName="note" errors={errors} rows={10} />
                    <div className="text-center">{watchNote[0]?.length} / 1000 Charachters</div>
                    {FieldInputs(customFields, register, errors, setValue)}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditAsset;
