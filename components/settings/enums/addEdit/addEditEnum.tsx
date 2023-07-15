import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormHeader from '../../../forms/formHeader';
import GeneralForm from '../../../forms/generalForm';
import FormContainer from '../../../forms/formContainer';
import { useAddEditEnums } from './useAddEditEnums';
import { addEditEnumHandler } from './addEditEnumHandler';
import { yupResolverEnums } from './addEditEnumValidation';
import LoadingNoDataError from '../../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditEnum = (props: ModalProps) => {
    const { allTypes, defaultValues, loading, error } = useAddEditEnums({ id: props.payload.id });
    const responsePeriods = [
        { id: 'DAY', value: 'DAY' },
        { id: 'WEEK', value: 'WEEK' },
        { id: 'MONTH', value: 'MONTH' },
        { id: 'YEAR', value: 'YEAR' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolverEnums,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    const watchType = watch(['type']);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditEnumHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={error}>
                <FormContainer>
                    <FormHeader label={props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Add Enum'} />
                    <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                        <GeneralFormInput register={register} label="Name" type="text" formName="name" errors={errors} required={true} />
                        <GeneralFormInput register={register} label="Order" type="number" formName="order" errors={errors} required={true} min={0} />
                        <GeneralFormInput register={register} label="Type" type="select" formName="type" errors={errors} required={true} optionNameString="type" selectOptions={allTypes} />
                        {watchType[0] == 1 ? (
                            <>
                                <label>Response Required Within: </label>
                                <span className="flex flex-row justify-start">
                                    <GeneralFormInput register={register} type="number" formName="effectOne" errors={errors} required={true} min={0} />
                                    <GeneralFormInput
                                        register={register}
                                        type="select"
                                        formName="effectTwo"
                                        errors={errors}
                                        required={true}
                                        optionNameString="value"
                                        selectOptions={responsePeriods}
                                        extraClasses="ml-4 px-2"
                                    />
                                </span>
                            </>
                        ) : null}
                        <GeneralFormSubmit closeModal={props.closeModal} />
                    </GeneralForm>
                </FormContainer>
            </LoadingNoDataError>
        </>
    );
};

export default AddEditEnum;
