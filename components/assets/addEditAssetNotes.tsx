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
    payload: { id: number; note: string };
}

const AddEditAssetNotes = (props: ModalProps) => {
    const alertString = `There has been an issue ${props.payload.id > 0 ? 'editing' : 'creating'} this Note, please try again.`;
    const defaultValues = { note: props.payload.note };

    const formValidation = yup.object().shape({
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
            const response = await axios.put(
                `${SERVER_URL}/asset/notes`,
                {
                    id: props.payload.id,
                    note: data.note,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
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
            <FormHeader label={props.payload.id > 0 ? 'Edit Notes' : 'Add Note'} />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <GeneralFormInput register={register} label="Notes" type="textarea" formName="note" errors={errors} rows={10} />
                <div className="text-center">{watchNote[0]?.length} / 1000 Charachters</div>
                <GeneralFormSubmit closeModal={props.closeModal} />
            </GeneralForm>
        </FormContainer>
    );
};

export default AddEditAssetNotes;
