import { useForm } from 'react-hook-form';
import { useEditSchedule } from './useEditSchedule';
import { useEffect, useMemo } from 'react';
import { yupResolverEditSchedule } from './editScheduleValidation';
import LoadingNoDataError from '../../loading/loadingNoDataError';
import FormContainer from '../../forms/formContainer';
import FormHeader from '../../forms/formHeader';
import GeneralForm from '../../forms/generalForm';
import GeneralFormInput from '../../forms/generalFormInput';
import FormTextCenter from '../../forms/formTextCenter';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import { editScheduleHandler } from './editScheduleHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; url: string };
}

const EditSchedule = (props: ModalProps) => {
    const { defaultValues, typeOptions, loading, error } = useEditSchedule(props.payload.id);
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
        resolver: yupResolverEditSchedule,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const [watchEditStart] = watch(['editStart']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await editScheduleHandler(props.payload.id, data, props.closeModal);
    };

    return (
        <>
            <FormContainer>
                <FormHeader label={'Edit PM Schedule'} />
                <LoadingNoDataError loading={loading} error={error}>
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        <GeneralFormInput register={register} label="PM Type" type="select" formName="type" errors={errors} required={true} optionNameString="value" selectOptions={typeOptions} />
                        <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="PM Description" type="textarea" formName="description" errors={errors} rows={5} />
                        <GeneralFormInput
                            register={register}
                            label="Adjust Current Due Date?"
                            type="select"
                            formName="editStart"
                            errors={errors}
                            required={true}
                            optionNameString="value"
                            selectOptions={yesNoOptions}
                        />
                        {watchEditStart === 'Yes' ? <GeneralFormInput register={register} label="Next Due" type="date" formName="scheduleStart" errors={errors} required={true} /> : null}
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
                </LoadingNoDataError>
            </FormContainer>
        </>
    );
};

export default EditSchedule;
