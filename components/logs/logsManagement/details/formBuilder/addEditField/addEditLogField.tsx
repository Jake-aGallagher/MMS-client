import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import LoadingNoDataError from '../../../../../loading/loadingNoDataError';
import FormContainer from '../../../../../forms/formContainer';
import FormHeader from '../../../../../forms/formHeader';
import GeneralForm from '../../../../../forms/generalForm';
import GeneralFormInput from '../../../../../forms/generalFormInput';
import GeneralFormSubmit from '../../../../../forms/generalFormSubmit';
import { yupResolverAddEditLogField } from './addEditLogFieldValidation';
import { useAddEditLogField } from './useAddEditLogField';
import { addEditLogFieldHandler } from './addEditLogFieldHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { fieldId: number; logId: number; name: string };
}

const AddEditLogField = (props: ModalProps) => {
    const { defaultValues, enumOptions, loading, error } = useAddEditLogField(props.payload.fieldId);
    const fieldTypeOptions = [
        { id: 'text', value: 'Text' },
        { id: 'textarea', value: 'Textarea' },
        { id: 'number', value: 'Number' },
        { id: 'info', value: 'Info/Guidance/Notes' },
        { id: 'checkbox', value: 'Checkbox'},
        { id: 'select', value: 'Select/Dropdown'},
        { id: 'file', value: 'File Upload'},
        { id: 'image', value: 'Image Upload'},
        { id: 'signature', value: 'Signature'},
        { id: 'date', value: 'Date'},
        { id: 'time', value: 'Time'},
    ];
    const yesNoOptions = [
        { id: 'No', value: 'No' },
        { id: 'Yes', value: 'Yes' },
    ];

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverAddEditLogField,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const [watchType] = watch(['type']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditLogFieldHandler(props.payload.fieldId, data, props.payload.logId, props.closeModal);
    };

    return (
        <FormContainer>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={'Add Edit Field'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Field Type" type="select" formName="type" errors={errors} required={true} optionNameString="value" selectOptions={fieldTypeOptions} />
                    {watchType === 'select' ? (
                        <GeneralFormInput register={register} label="Options (Enum Group)" type="select" formName="options" errors={errors} optionNameString="value" selectOptions={enumOptions}/>
                    ) : null}
                    <GeneralFormInput register={register} label={watchType !== 'info' ? 'Field Name' : 'Info/Guidance/Note'} type="text" formName="name" errors={errors} />
                    {watchType !== 'info' ? (
                        <>
                            <GeneralFormInput
                                register={register}
                                label="Mandatory Field"
                                type="select"
                                formName="required"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={yesNoOptions}
                            />
                            <GeneralFormInput register={register} label="Guidance Notes (will Show in tooltip)" type="text" formName="guidance" errors={errors} />
                        </>
                    ) : null}
                    <GeneralFormInput register={register} label="Order" type="number" formName="order" errors={errors} min={0} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AddEditLogField;
