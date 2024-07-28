import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../forms/generalFormInput';
import FormHeader from '../../../../forms/formHeader';
import GeneralForm from '../../../../forms/generalForm';
import FormContainer from '../../../../forms/formContainer';
import { addAuditTemplateHandler } from './addAuditTemplateHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { name: string };
}

const AddAuditTemplate = (props: ModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const handleRegistration = async (data: { title: string }) => {
        await addAuditTemplateHandler(data.title, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <FormHeader label="Add Audit Template" />
            <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                <GeneralFormInput register={register} label="Template Title" type="text" formName="title" errors={errors} required={true} />
                <GeneralFormSubmit closeModal={props.closeModal} />
            </GeneralForm>
        </FormContainer>
    );
};

export default AddAuditTemplate;
