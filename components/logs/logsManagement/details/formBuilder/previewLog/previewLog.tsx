import { useForm } from 'react-hook-form';
import LoadingNoDataError from '../../../../../loading/loadingNoDataError';
import FormContainer from '../../../../../forms/formContainer';
import FormHeader from '../../../../../forms/formHeader';
import GeneralForm from '../../../../../forms/generalForm';
import GeneralFormInput from '../../../../../forms/generalFormInput';
import GeneralFormSubmit from '../../../../../forms/generalFormSubmit';
import { useLogPreview } from '../../../../useLogPreview';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const PreviewLog = (props: ModalProps) => {
    const { logFields, enumGroups, loading, error } = useLogPreview(props.payload.id);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegistration = async (data: any) => {
        props.closeModal();
    };

    const fields = logFields.map((field) => {
        switch (field.type) {
            case 'select':
                if (field.enumGroupId) {
                    return (
                        <GeneralFormInput
                            key={field.id}
                            register={register}
                            label={field.name}
                            type={field.type}
                            formName={field.id.toString()}
                            errors={errors}
                            required={field.required}
                            optionNameString="value"
                            selectOptions={enumGroups[field.enumGroupId]}
                        />
                    );
                } else {
                    return;
                }
            default:
                return <GeneralFormInput key={field.id} register={register} label={field.name} type={field.type} formName={field.id.toString()} errors={errors} required={field.required} />;
        }
    });

    return (
        <FormContainer>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={`${props.payload.name} Log Preview`} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    {fields}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default PreviewLog;
