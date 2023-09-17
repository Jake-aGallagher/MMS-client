import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import FormTextCenter from '../../forms/formTextCenter';
import { adjustSparesStockHandler } from './adjustSparesStockHandler';
import { yupResolverAdjustSparesStock } from './adjustSparesStockValidation';
import { useAdjustSparesStock } from './useAdjustSparesStock';
import LoadingNoDataError from '../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AdjustSparesStock = (props: ModalProps) => {
    const { spareStock, loading, error } = useAdjustSparesStock({ SpareId: props.payload.id });

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
    let newStock = spareStock + watchDiff;

    const handleRegistration = async (data: any) => {
        await adjustSparesStockHandler(data, props.payload.id, spareStock, props.closeModal);
    };

    return (
        <LoadingNoDataError loading={loading} error={error}>
            <FormContainer>
                <FormHeader label={'Adjust Stock level for ' + props.payload.name} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <FormTextCenter label={'Current Stock level'} />
                    <FormTextCenter label={spareStock.toString()} />
                    <GeneralFormInput register={register} label="Difference" type="number" formName="diff" errors={errors} required={true} min={0 - newStock} />
                    <FormTextCenter label={'New Stock Level'} />
                    <FormTextCenter label={newStock.toString()} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </FormContainer>
        </LoadingNoDataError>
    );
};

export default AdjustSparesStock;
