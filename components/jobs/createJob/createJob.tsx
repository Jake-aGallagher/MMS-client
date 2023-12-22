import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ModalBase from '../../modal/modal';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import { useCreateJob } from './useCreateJob';
import { yupResolverCreateJob } from './createJobValidation';
import { createJobHandler } from './createJobHandler';
import FormTextCenter from '../../forms/formTextCenter';

interface ModalProps {
    closeModal: () => void;
    assetId: number;
}

const CreateJob = (props: ModalProps) => {
    const { defaultValues, typeOptions, urgencyOptions, loading, error } = useCreateJob();
    const userId = useSelector((state: RootState) => state.user.value.id);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalPayload, setModalPayload] = useState(0);
    const breakdownScheduledOptions = [
        { id: 'Breakdown', value: 'Breakdown' },
        { id: 'Scheduled', value: 'Scheduled' },
    ];
    const yesNoOptions = [
        { id: 'No', value: 'No' },
        { id: 'Yes', value: 'Yes' },
    ];
    const timeUnitOptions = [
        { id: 'DAY', value: 'Days' },
        { id: 'WEEK', value: 'Weeks' },
        { id: 'MONTH', value: 'Months' },
        { id: 'YEAR', value: 'Years' },
    ];

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverCreateJob,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const [watchBreakdownSchedule] = watch(['breakdownOrSchedule']);
    const [watchStartNow] = watch(['startNow']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await createJobHandler({ data, currentProperty, assetId: props.assetId, userId, closeModal: props.closeModal, setModalPayload, setModalType, setViewModal });
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <>
                    {viewModal ? <ModalBase modalType={modalType} payload={modalPayload} fullSize={true} closeModal={() => [setViewModal(false), props.closeModal()]} /> : ''}
                    <FormContainer>
                        <FormHeader label={'Create New Job'} />
                        <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                            <GeneralFormInput
                                register={register}
                                label="Breakdown or Scheduled"
                                type="select"
                                formName="breakdownOrSchedule"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={breakdownScheduledOptions}
                            />
                            <GeneralFormInput
                                register={register}
                                label="Job Type"
                                type="select"
                                formName="selectedType"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={typeOptions}
                            />
                            <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                            <GeneralFormInput register={register} label="Job Description" type="textarea" formName="description" errors={errors} rows={5} />

                            {watchBreakdownSchedule === 'Scheduled' ? (
                                <>
                                    <GeneralFormInput
                                        register={register}
                                        label="Start from today"
                                        type="select"
                                        formName="startNow"
                                        errors={errors}
                                        required={true}
                                        optionNameString="value"
                                        selectOptions={yesNoOptions}
                                    />
                                    {watchStartNow === 'No' ? (
                                        <GeneralFormInput register={register} label="Start Date" type="date" formName="scheduleStart" errors={errors} required={true} />
                                    ) : null}
                                    <FormTextCenter label="Schedule frequency" />
                                    <div className="flex flex-row w-full gap-2">
                                        <GeneralFormInput register={register} label="Frequency" type="number" formName="intervalFrequency" errors={errors} required={true} min={1} />
                                        <GeneralFormInput
                                            register={register}
                                            label="Time Unit"
                                            type="select"
                                            formName="intervalTimeUnit"
                                            errors={errors}
                                            required={true}
                                            optionNameString="value"
                                            selectOptions={timeUnitOptions}
                                            extraClasses={'w-full'}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <GeneralFormInput
                                        register={register}
                                        label="Urgency"
                                        type="select"
                                        formName="selectedUrgency"
                                        errors={errors}
                                        required={true}
                                        optionNameString="value"
                                        selectOptions={urgencyOptions}
                                    />
                                    <GeneralFormInput
                                        register={register}
                                        label="Would you like to update and/or complete this Job immediately"
                                        type="select"
                                        formName="compNow"
                                        errors={errors}
                                        required={true}
                                        optionNameString="value"
                                        selectOptions={yesNoOptions}
                                    />
                                </>
                            )}
                            <GeneralFormSubmit closeModal={props.closeModal} />
                        </GeneralForm>
                    </FormContainer>
                </>
            </LoadingNoDataError>
            ;
        </>
    );
};

export default CreateJob;
