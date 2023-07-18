import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import FormTextCenter from '../../forms/formTextCenter';
import { adjustSparesStockHandler } from './adjustSparesStockHandler';
import { yupResolverAdjustSparesStock } from './adjustSparesStockValidation';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; quantityRemaining: number };
}

const AdjustSparesStock = (props: ModalProps) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAdjustSparesStock,
        defaultValues: { diff: 0 },
    });

    const watchDiff = watch('diff');
    let newStock = props.payload.quantityRemaining + watchDiff;

    const handleRegistration = async (data: any) => {
        await adjustSparesStockHandler(data, props.payload.id, props.payload.quantityRemaining, props.closeModal);
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
