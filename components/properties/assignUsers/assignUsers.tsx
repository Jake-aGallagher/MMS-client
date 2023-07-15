import Loading from '../../loading/loading';
import RetrieveError from '../../error/retrieveError';
import { useForm } from 'react-hook-form';
import FormHeader from '../../forms/formHeader';
import GeneralFormSubmit from '../../forms/generalFormSubmit';
import GeneralFormInput from '../../forms/generalFormInput';
import FormContainer from '../../forms/formContainer';
import GeneralForm from '../../forms/generalForm';
import { useAssignUsers } from './useAssignUsers';
import { assignUsersdHandler } from './assignUsersHandler';

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
        <>
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <FormContainer>
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
                </FormContainer>
            )}
        </>
    );
};

export default AssignUsers;
