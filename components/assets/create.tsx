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
    payload: { parentId: number; parentName: string };
}

const AddAsset = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const alertString = `There has been an issue creating this Asset, please try again.`;

    const formValidation = yup.object().shape({
        name: yup.string().required().max(45),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
    });

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.post(
                `${SERVER_URL}/asset`,
                {
                    parentId: props.payload.parentId,
                    propertyId: currentProperty,
                    name: data.name,
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
            <FormHeader label={'Create New Component of ' + props.payload.parentName} />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <GeneralFormInput register={register} label="Component Name" type="text" formName="name" errors={errors} required={true} />
                <GeneralFormSubmit closeModal={props.closeModal} />
            </GeneralForm>
        </FormContainer>
    );
};

export default AddAsset;
