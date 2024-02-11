import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import FormContainer from "../../../forms/formContainer";
import LoadingNoDataError from "../../../loading/loadingNoDataError";
import FormHeader from "../../../forms/formHeader";
import GeneralForm from "../../../forms/generalForm";
import GeneralFormInput from "../../../forms/generalFormInput";
import GeneralFormSubmit from "../../../forms/generalFormSubmit";
import { useAddEditFields } from "./useAddEditFields";
import { yupResolverAddEditField } from "./addEditFieldValidation";
import { addEditFieldHandler } from "./addEditFieldHandler";

interface Props {
    payload: {id : number, name: string, model: string};
    closeModal: () => void;
}

const AddEditField = (props: Props) => {
    const { defaultValues, enumOptions, loading, error } = useAddEditFields(props.payload.id);
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
        resolver: yupResolverAddEditField,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const [watchType] = watch(['type']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditFieldHandler(props.payload.id, props.payload.model, data, props.closeModal);
    };

    
    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={`Add Edit Field`} />
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
                        </>
                    ) : null}
                    <GeneralFormInput register={register} label="Order" type="number" formName="order" errors={errors} min={0} />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    )
}

export default AddEditField;