import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    usersList: User[];
    updateUsersSelected: (user: User) => void;
}

interface User {
    id: number;
    name: string;
    time: number;
}

const UsersAvailableTable = (props: Props) => {
    const showCurrent = props.usersList.map((user) => (
        <tr className="border-t-1 h-12 border-solid border-primary" key={'current_user_' + user.id}>
            <td className="text-center">{user.name}</td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => props.updateUsersSelected(user)}>
                <FontAwesomeIcon icon={faPlus} className="h-5 m-auto" />
            </td>
        </tr>
    ));

    return <tbody>{showCurrent}</tbody>;
};

export default UsersAvailableTable;
