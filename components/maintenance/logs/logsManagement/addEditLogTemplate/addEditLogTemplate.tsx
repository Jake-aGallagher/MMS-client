import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../../forms/formHeader';
import GeneralFormSubmit from '../../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../../forms/generalFormInput';
import FormContainer from '../../../../forms/formContainer';
import GeneralForm from '../../../../forms/generalForm';
import LoadingNoDataError from '../../../../loading/loadingNoDataError';
import { useAddEditLogTemplate } from './useAddEditLogTemplate';
import { yupResolverAddEditLogTemplate } from './addEditLogTemplateValidation';
import { addEditLogTemplateHandler } from './addEditLogTemplateHandler';
import FormTextCenter from '../../../../forms/formTextCenter';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditLogTemplate = (props: ModalProps) => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { defaultValues, loading, error } = useAddEditLogTemplate(props.payload.id);
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
        resolver: yupResolverAddEditLogTemplate(props.payload.id === 0),
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const [watchStartNow] = watch(['startNow']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditLogTemplateHandler(props.payload.id, data, currentFacility, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label={'Create New Log Template'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Title" type="text" formName="title" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Log Description (will show at top of Log)" type="textarea" formName="description" errors={errors} rows={5} />
                    {props.payload.id === 0 ? (
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
                            {watchStartNow === 'No' ? <GeneralFormInput register={register} label="Start Date" type="date" formName="scheduleStart" errors={errors} required={true} /> : null}
                        </>
                    ) : null}
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
    );
};

export default AddEditLogTemplate;
