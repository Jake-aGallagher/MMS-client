import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import FileInput from '../../forms/fileInput';
import GeneralFormInput from '../../forms/generalFormInput';
import InfoField from '../../forms/infoField';
import SignatureInput from '../../forms/signatureInput';
import { CustomFieldData, DefaultValues } from '../../../commonTypes/CustomFields';

export const FieldInputs = (customFields: CustomFieldData, register: UseFormRegister<DefaultValues>, errors: FieldErrors<DefaultValues>, setValue: UseFormSetValue<DefaultValues>) => {
    const fields = customFields.fields.map((field) => {
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
                            selectOptions={customFields.enumGroups[field.enumGroupId]}
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
                        existingFiles={customFields.fileData[field.id] || []}
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
                        existingFiles={customFields.fileData[field.id] || []}
                        type={field.type}
                    />
                );
            case 'info':
                return <InfoField key={field.id} name={field.name} />;
            default:
                return <GeneralFormInput key={field.id} register={register} label={field.name} type={field.type} formName={field.id.toString()} errors={errors} required={field.required} />;
        }
    });
    return fields;
};
