import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import { yupResolverAddEditAsset } from './addEditAssetValidation';
import { addEditAssetHandler } from './addEditAssetHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { type: 'add' | 'edit'; id: number; name: string; note?: string };
}

const AddEditAsset = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const alertString = `There has been an issue ${props.payload.type == 'add' ? 'creating' : 'editing'} this Asset, please try again.`;
    const formLabel = `${props.payload.type == 'add' ? 'Create New Component of' : 'Edit'} ${props.payload.name}`;
    const defaultValues = props.payload.type == 'add' ? { name: '', note: '' } : { name: props.payload.name, note: props.payload.note ? props.payload.note : '' };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditAsset,
        defaultValues: defaultValues,
    });

    const watchNote = watch(['note']);

    const handleRegistration = async (data: any) => {
        await addEditAssetHandler(data, props.payload.type, props.payload.id, currentProperty, props.closeModal);
    };
    console.log(errors)
    return (
        <FormContainer>
            <FormHeader label={formLabel} />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <GeneralFormInput register={register} label="Component Name" type="text" formName="name" errors={errors} required={true} />
                <GeneralFormInput register={register} label="Notes" type="textarea" formName="note" errors={errors} rows={10} />
                <div className="text-center">{watchNote[0]?.length} / 1000 Charachters</div>
                <GeneralFormSubmit closeModal={props.closeModal} />
            </GeneralForm>
        </FormContainer>
    );
};

export default AddEditAsset;