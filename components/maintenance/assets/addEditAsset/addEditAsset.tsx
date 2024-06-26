import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../forms/formHeader';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import { addEditAssetHandler } from './addEditAssetHandler';
import { useAddEditAsset } from './useAddEditAsset';
import { FieldInputs } from '../../../settings/customFields/fieldInputs';
import { useEffect, useMemo } from 'react';
import LoadingNoDataError from '../../../loading/loadingNoDataError';
import InfoField from '../../../forms/infoField';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; parentId?: number; note?: string };
}

const AddEditAsset = (props: ModalProps) => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const formLabel = `${props.payload.parentId ? 'Create New Component of' : 'Edit'} ${props.payload.name}`;
    const { defaultValues, customFields, loading, error } = useAddEditAsset(props.payload.parentId ? 0 : props.payload.id);
    const rpmString = `
        Revenue per Minute is used to calculate the cost of downtime and to accuratly assess the financial impact of missing spare parts.
        Assign this asset an RPM value if downtime on this equipment would have a financial impact.
        If you are unsure, leave this field blank.`;

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
        await addEditAssetHandler(data, props.payload.parentId || 0, props.payload.id, currentFacility, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={formLabel} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Component Name" type="text" formName="name" errors={errors} required={true} />
                    <InfoField name={rpmString} />
                    <GeneralFormInput register={register} label="Revenue per Minute (£)" type="number" formName="revenue" errors={errors} min={0} max={10000} />
                    <GeneralFormInput register={register} label="Notes" type="textarea" formName="note" errors={errors} rows={10} />
                    <div className="text-right -mt-4 pr-4 mb-8">{watchNote[0]?.length} / 1000 Charachters</div>
                    {FieldInputs(customFields, register, errors, setValue)}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditAsset;
