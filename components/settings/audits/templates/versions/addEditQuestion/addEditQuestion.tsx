import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../../forms/generalFormInput';
import FormHeader from '../../../../../forms/formHeader';
import FormContainer from '../../../../../forms/formContainer';
import GeneralForm from '../../../../../forms/generalForm';
import LoadingNoDataError from '../../../../../loading/loadingNoDataError';
import { useAddEditQuestion } from './useAddEditQuestion';
import { yupResolverAddEditQuestion } from './addEditQuestionValidation';
import { addEditQuestionHandler } from './addEditQuestionHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; topicId: number; };
}

const AddEditAuditQuestion = (props: ModalProps) => {
    const { defaultValues, loading, error } = useAddEditQuestion(props.payload.id);
    const fieldTypeOptions = [
        { id: 'text', value: 'Text' },
        { id: 'textarea', value: 'Textarea' },
        { id: 'number', value: 'Number' },
        { id: 'checkbox', value: 'Checkbox' },
        { id: 'select', value: 'Select/Dropdown' },
        { id: 'multi-select', value: 'Multi-Select' },
        { id: 'file', value: 'File Upload' },
        { id: 'image', value: 'Image Upload' },
        { id: 'signature', value: 'Signature' },
        { id: 'date', value: 'Date' },
        { id: 'time', value: 'Time' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditQuestion,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditQuestionHandler(data, props.payload.id, props.payload.topicId, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + defaultValues.title : 'Add Question'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Question Type" type="select" formName="questionType" errors={errors} required={true} optionNameString="value" selectOptions={fieldTypeOptions} />
                    <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Order" type="number" formName="sortOrder" errors={errors} required={true} min={0} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditAuditQuestion;
