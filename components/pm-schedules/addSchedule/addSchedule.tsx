import { useForm } from 'react-hook-form';
import FormContainer from '../../forms/formContainer';
import FormHeader from '../../forms/formHeader';
import GeneralForm from '../../forms/generalForm';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import { useEffect, useMemo } from 'react';
import { useAddSchedule } from './useAddSchedule';
import { yupResolverAddSchedule } from './addScheduleValidation';
import GeneralFormInput from '../../forms/generalFormInput';
import FormTextCenter from '../../forms/formTextCenter';
import { addScheduleHandler } from './addScheduleHandler';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GeneralFormSubmit from '../../forms/generalFormSubmit';

interface ModalProps {
    closeModal: () => void;
    assetId: number;
}

const AddSchedule = (props: ModalProps) => {
    const propertyId = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { defaultValues, typeOptions, loading, error } = useAddSchedule();
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
        resolver: yupResolverAddSchedule,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const [watchStartNow] = watch(['startNow']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addScheduleHandler({ data, propertyId, assetId: props.assetId, closeModal: props.closeModal });
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <FormContainer>
                    <FormHeader label={'Create New Planned Maintenance Job'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        <GeneralFormInput register={register} label="PM Type" type="select" formName="type" errors={errors} required={true} optionNameString="value" selectOptions={typeOptions} />
                        <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="PM Description" type="textarea" formName="description" errors={errors} rows={5} />
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
                        {watchStartNow === 'No' ? <GeneralFormInput register={register} label="Start Date" type="date" formName="scheduleStart" errors={errors} required={true} /> : null}
                        <FormTextCenter label="Schedule frequency" />
                        <div className="flex flex-row w-full gap-2">
                            <GeneralFormInput register={register} label="Frequency" type="number" formName="frequencyTime" errors={errors} required={true} min={1} />
                            <GeneralFormInput
                                register={register}
                                label="Time Unit"
                                type="select"
                                formName="frequencyUnit"
                                errors={errors}
                                required={true}
                                optionNameString="value"
                                selectOptions={timeUnitOptions}
                                extraClasses={'w-full'}
                            />
                        </div>
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </GeneralForm>
                </FormContainer>
            </LoadingNoDataError>
        </>
    );
};

export default AddSchedule;
