import AltTableContainer from '../dataTable/altTableContainer';
import AltTableHeaders from '../dataTable/altTableHeaders';
import FormContainer from '../forms/formContainer';
import FormHeader from '../forms/formHeader';
import LoadingNoDataError from '../loading/loadingNoDataError';
import { useUsersSelector } from './useUsersSelector';
import UsersAvailableTable from './usersAvailableTable';

interface ModalProps {
    closeModal: () => void;
    payload: { loggedTimeDetails: LoggedTime[]; type: string };
    passbackDetails: (usedSparesArray: LoggedTime[]) => void;
}

interface LoggedTime {
    id: number;
    name: string;
    time: number;
}

const UsersSelector = (props: ModalProps) => {
    const { userslist, loading, error } = useUsersSelector(props.payload.loggedTimeDetails);

    const updateUsersSelected = (user: LoggedTime) => {
        props.passbackDetails([...props.payload.loggedTimeDetails, { ...user, time: 5 }]);
        props.closeModal();
    };

    return (
        <FormContainer>
            <LoadingNoDataError loading={loading} error={error}>
                <FormHeader label="Log Time for User" />
                <div className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                    <AltTableContainer>
                        <AltTableHeaders headers={['Name', 'Add']} />
                        <UsersAvailableTable usersList={userslist} updateUsersSelected={updateUsersSelected} />
                    </AltTableContainer>

                    <div className="flex flex-row justify-end items-center absolute bottom-0 h-16 left-0 w-full">
                        <button className="btnBlue h-8 mr-4 px-4 w-32" onClick={(e) => [e.preventDefault(), props.closeModal()]}>
                            Cancel
                        </button>
                    </div>
                </div>
            </LoadingNoDataError>
        </FormContainer>
    );
};

export default UsersSelector;
