import { useForm } from 'react-hook-form';
import FormHeader from '../formHeader';
import GeneralFormSubmit from '../generalFormSubmit';
import FormContainer from '../formContainer';
import GeneralForm from '../generalForm';
import FormTextCenter from '../formTextCenter';
import { deleteFormHandler } from './deleteFormHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; url: string };
}

const DeleteForm = (props: ModalProps) => {
    const { handleSubmit } = useForm();

    const handleRegistration = async () => {
        await deleteFormHandler(props.payload.name, props.payload.url, props.payload.id, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <FormHeader label={'Delete ' + props.payload.name} />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <FormTextCenter label={'Name: ' + props.payload.name} />
                <FormTextCenter label={`Please click delete to confirm.`} />
                <GeneralFormSubmit closeModal={props.closeModal} submitLabel="Delete" />
            </GeneralForm>
        </FormContainer>
    );
};

export default DeleteForm;
