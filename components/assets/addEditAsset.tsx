import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';
import FormContainer from '../forms/formContainer';
import GeneralForm from '../forms/generalForm';

interface ModalProps {
    closeModal: () => void;
    payload: { type: 'add' | 'edit'; id: number; name: string;  note?: string}
}

const AddEditAsset = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const alertString = `There has been an issue ${props.payload.type == 'add' ? 'creating' : 'editing'} this Asset, please try again.`;
    const formLabel = `${props.payload.type == 'add' ? 'Create New Component of' : 'Edit'} ${props.payload.name}`
    const defaultValues = props.payload.type == 'add' ? {name: '', note: ''} : {name: props.payload.name, note: props.payload.note}

    const formValidation = yup.object().shape({
        name: yup.string().required().max(45),
        note: yup.string().max(1000),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: defaultValues,
    });

    const watchNote = watch(['note']);

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.post(
                `${SERVER_URL}/asset`,
                {
                    type: props.payload.type,
                    id: props.payload.id,
                    propertyId: currentProperty,
                    name: data.name,
                    note: data.note,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert(alertString);
            }
        } catch (err) {
            alert(alertString);
        }
    };

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
