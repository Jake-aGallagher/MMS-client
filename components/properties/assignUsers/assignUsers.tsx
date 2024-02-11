import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import { useAssignUsers } from './useAssignUsers';
import { assignUsersdHandler } from './assignUsersHandler';
import LoadingNoDataError from '../../loading/loadingNoDataError';

interface ModalProps {
    closeModal: () => void;
    propertyNumber: number;
}

const AssignUsers = (props: ModalProps) => {
    const { users, loading, noData, error } = useAssignUsers({ propertyNumber: props.propertyNumber });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegistration = async (data: any) => {
        await assignUsersdHandler(data, props.propertyNumber, props.closeModal);
    };

    return (
        <FormContainer closeModal={props.closeModal}>
            <LoadingNoDataError loading={loading} error={error} noData={noData}>
                <FormHeader label={'Assign Users'} />
                <GeneralForm handleSubmit={handleSubmit} handleRegistration={handleRegistration}>
                    {users.map((user) => (
                        <GeneralFormInput
                            key={user.id}
                            register={register}
                            label={user.first_name + ' ' + user.last_name}
                            type="checkbox"
                            formName={user.id.toString()}
                            errors={errors}
                            checked={user.assigned}
                        />
                    ))}
                    <GeneralFormSubmit closeModal={props.closeModal} />
                </GeneralForm>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default AssignUsers;
