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
import FormTextCenter from '../forms/formTextCenter';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; quantityRemaining: number };
}

const AdjustSparesStock = (props: ModalProps) => {
    const alertString = `There has been an issue adjusting this stock level, please try again.`;
    const defaultValues = { diff: 0 };
    const formValidation = yup.object().shape({ diff: yup.number().required() });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidation),
        defaultValues: defaultValues,
    });

    const watchDiff = watch('diff');
    let newStock = props.payload.quantityRemaining + watchDiff;

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.put(
                `${SERVER_URL}/spares/adjust-stock`,
                {
                    id: props.payload.id,
                    newStock: props.payload.quantityRemaining + data.diff,
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
            <FormHeader label={'Adjust Stock level for ' + props.payload.name} />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <FormTextCenter label={'Current Stock level'} />
                <FormTextCenter label={props.payload.quantityRemaining.toString()} />
                <GeneralFormInput register={register} label="Difference" type="number" formName="diff" errors={errors} required={true} min={0 - newStock} />
                <FormTextCenter label={'New Stock Level'} />
                <FormTextCenter label={newStock.toString()} />
                <GeneralFormSubmit closeModal={props.closeModal} />
            </GeneralForm>
        </FormContainer>
    );
};

export default AdjustSparesStock;
