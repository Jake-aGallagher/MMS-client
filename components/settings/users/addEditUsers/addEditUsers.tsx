import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useForm } from 'react-hook-form';
import FormHeader from '../../../forms/formHeader';
import GeneralFormSubmit from '../../../forms/generalFormSubmit';
import GeneralFormInput from '../../../forms/generalFormInput';
import FormContainer from '../../../forms/formContainer';
import GeneralForm from '../../../forms/generalForm';
import { yupResolverUsers } from './addEditUserValidation';
import { useAddEditUsers } from './useAddEditUsers';
import LoadingNoDataError from '../../../loading/loadingNoDataError';
import { addEditUsersHandler } from './addEditUsersHandler';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditUser = (props: ModalProps) => {
    const user_group_id = useSelector((state: RootState) => state.user.value.user_group_id);
    const { defaultValues, userGroups, loading, error } = useAddEditUsers(props.payload.id, user_group_id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolverUsers,
        defaultValues: useMemo(() => {
            return defaultValues;
        }, [defaultValues]),
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const handleRegistration = async (data: any) => {
        await addEditUsersHandler(data, props.payload.id, props.closeModal);
    };

    return (
        <LoadingNoDataError loading={loading} error={error}>
            <FormContainer>
                <FormHeader label={props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Create User'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    <GeneralFormInput register={register} label="Username" type="text" formName="username" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="First Name" type="text" formName="first" errors={errors} required={true} />
                    <GeneralFormInput register={register} label="Last Name" type="text" formName="last" errors={errors} required={true} />
                    {props.payload.id == 0 ? (
                        <>
                            <GeneralFormInput register={register} label="Password" type="password" formName="password" errors={errors} />
                            <GeneralFormInput register={register} label="Re-Enter Password" type="password" formName="retyped" errors={errors} />
                        </>
                    ) : null}
                    <GeneralFormInput
                        register={register}
                        label="User Group"
                        type="select"
                        formName="user_group_id"
                        errors={errors}
                        required={true}
                        optionNameString="name"
                        selectOptions={userGroups}
                    />
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </FormContainer>
        </LoadingNoDataError>
    );
};

export default AddEditUser;
