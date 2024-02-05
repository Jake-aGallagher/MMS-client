import { useForm } from 'react-hook-form';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import FormContainer from '../../forms/formContainer';
import FormHeader from '../../forms/formHeader';
import GeneralForm from '../../forms/generalForm';
import GeneralFormInput from '../../forms/generalFormInput';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import { useLogFields } from '../useLogFields';
import { useEffect, useMemo } from 'react';
import { updateLogHandler } from './updateLogHandler';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import FormTextCenter from '../../forms/formTextCenter';
import FileInput from '../../forms/fileInput';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const UpdateLog = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const userId = useSelector((state: RootState) => state.user.value.id);
    const { logFields, enumGroups, fileData, defaultValues, logDates, loading, error } = useLogFields(props.payload.id);
    const continueScheduleOptions = [
        { id: 'Yes', value: `Continue on current schedule (next due: ${logDates[0].current_schedule || ''})` },
        { id: 'Adjust', value: `Adjust schedule (next due: ${logDates[0].new_schedule || ''})` },
    ];

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const completedWatch = watch(['completed']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await updateLogHandler(props.payload.id, data, currentProperty, userId, props.closeModal);
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
                return (
                    <FileInput key={field.id} register={register} label={field.name} formName={field.id.toString()} errors={errors} required={field.required} setValue={setValue} existingFiles={fileData[field.id] || []} />
                );
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
                    <GeneralFormInput register={register} label="Completed" type="checkbox" formName="completed" errors={errors} />
                    {completedWatch[0] ? (
                        <>
                            <GeneralFormInput
                                register={register}
                                label="Continue Schedule"
                                type="select"
                                formName="continueSchedule"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={continueScheduleOptions}
                            />
                            <div className="mt-auto">
                                <FormTextCenter label="You are about to Complete this Log, once completed It will no longer be editable" />
                            </div>
                        </>
                    ) : null}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default UpdateLog;
