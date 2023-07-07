import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import { SERVER_URL } from '../routing/addressAPI';
import { useForm } from 'react-hook-form';
import FormHeader from '../forms/formHeader';
import GeneralFormSubmit from '../forms/generalFormSubmit';
import GeneralFormInput from '../forms/generalFormInput';
import FormContainer from '../forms/formContainer';
import GeneralForm from '../forms/generalForm';

interface ModalProps {
    closeModal: () => void;
    propertyNumber: number;
}

interface UsersList {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    authority: number;
    assigned: boolean;
}

const AssignUsers = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const alertString = `There has been an issue Assigning Users to this Property, please try again.`;
    const [users, setUsers] = useState<UsersList[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getUsersForAssign();
    }, []);

    const getUsersForAssign = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/users-for-assigning/${props.propertyNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setUsers(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const handleRegistration = async (data: any) => {
        let assignedUsers: string[] = [];
        const dataKeys = Object.keys(data);
        if (dataKeys.length > 0) {
            assignedUsers = dataKeys.filter((k) => data[k]);
        }
        try {
            const response = await axios.put(
                `${SERVER_URL}/properties/assign-users`,
                {
                    propertyNo: props.propertyNumber,
                    assignedUsers: assignedUsers,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert(alertString);
            }
        } catch (err) {
            alert(alertString);
        }
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
