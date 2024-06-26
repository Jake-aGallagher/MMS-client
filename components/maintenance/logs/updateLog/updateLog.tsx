import { useForm } from 'react-hook-form';
import LoadingNoDataError from '../../../loading/loadingNoDataError';
import FormContainer from '../../../forms/formContainer';
import FormHeader from '../../../forms/formHeader';
import GeneralForm from '../../../forms/generalForm';
import GeneralFormInput from '../../../forms/generalFormInput';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import { useLogFields } from '../useLogFields';
import { useEffect, useMemo } from 'react';
import { updateLogHandler } from './updateLogHandler';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import FormTextCenter from '../../../forms/formTextCenter';
import InfoField from '../../../forms/infoField';
import { FieldInputs } from '../../../settings/customFields/fieldInputs';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const UpdateLog = (props: ModalProps) => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const userId = useSelector((state: RootState) => state.user.value.id);
    const { customFields, logTitleDescription, defaultValues, logDates, loading, error } = useLogFields(props.payload.id);
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
        await updateLogHandler(props.payload.id, data, currentFacility, userId, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={`${props.payload.name} Log Preview`} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <InfoField name={logTitleDescription.description} />
                    {FieldInputs(customFields, register, errors, setValue)}
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
