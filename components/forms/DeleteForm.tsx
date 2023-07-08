import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { useForm } from 'react-hook-form';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import FormContainer from '../forms/formContainer';
import GeneralForm from '../forms/generalForm';
import FormTextCenter from '../forms/formTextCenter';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; url: string };
}

const DeleteForm = (props: ModalProps) => {
    const alertString = `There has been an issue deleting ${props.payload.name}, please try again.`;
    const { handleSubmit } = useForm();

    const handleRegistration = async () => {
        try {
            const response = await axios.delete(`${SERVER_URL}/${props.payload.url}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                data: {
                    id: props.payload.id,
                },
            });
            if (response.data.deleted) {
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
