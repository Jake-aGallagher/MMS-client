import { useForm } from 'react-hook-form';
import LoadingNoDataError from '../../../../../loading/loadingNoDataError';
import FormContainer from '../../../../../forms/formContainer';
import FormHeader from '../../../../../forms/formHeader';
import GeneralForm from '../../../../../forms/generalForm';
import GeneralFormInput from '../../../../../forms/generalFormInput';
import GeneralFormSubmit from '../../../../../forms/generalFormSubmit';
import { useLogPreview } from '../../../../useLogPreview';
import FileInput from '../../../../../forms/fileInput';
import SignatureInput from '../../../../../forms/signatureInput';
import InfoField from '../../../../../forms/infoField';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const PreviewLog = (props: ModalProps) => {
    const { logFields, enumGroups, logTitleDescription, loading, error } = useLogPreview(props.payload.id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
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
            case 'file':
            case 'image':
                return (
                    <FileInput
                        key={field.id}
                        register={register}
                        label={field.name}
                        formName={field.id.toString()}
                        errors={errors}
                        required={field.required}
                        setValue={setValue}
                        existingFiles={[]}
                        type={field.type}
                    />
                );
            case 'signature':
                return (
                    <SignatureInput
                        key={field.id}
                        register={register}
                        label={field.name}
                        formName={field.id.toString()}
                        errors={errors}
                        required={field.required}
                        setValue={setValue}
                        existingFiles={[]}
                        type={field.type}
                    />
                );
            case 'info':
                return <InfoField key={field.id} name={field.name} />;
            default:
                return <GeneralFormInput key={field.id} register={register} label={field.name} type={field.type} formName={field.id.toString()} errors={errors} required={field.required} />;
        }
    });

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={`${logTitleDescription.title} Log Preview`} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <InfoField name={logTitleDescription.description} />
                    {fields}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default PreviewLog;
