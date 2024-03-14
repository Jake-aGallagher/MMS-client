import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateAction } from 'react';

interface Props {
    usersSelected: User[];
    setUsersSelected: (value: SetStateAction<User[]>) => void;
}

interface User {
    id: number;
    name: string;
    time: number;
}

const UsersAddRemoveTable = (props: Props) => {
    const updateSparesSelected = (id: number, type: 'add' | 'minus' | 'remove') => {
        const index = props.usersSelected.findIndex((item) => item.id == id);
        const user = props.usersSelected[index];
        const newArr = [...props.usersSelected];
        if (type == 'add') {
            newArr[index] = { ...user, time: user.time + 5 };
        } else if (type == 'minus' && user.time > 0) {
            newArr[index] = { ...user, time: user.time - 5 };
        } else if (type == 'remove') {
            newArr[index] = { ...user, time: 0 };
        }
        props.setUsersSelected(newArr);
    };

    const sparesTable = props.usersSelected.map((user) => (
        <tr className="border-t-1 h-12 border-solid border-primary" key={'current_item_' + user.id}>
            <td className="text-center">{user.name}</td>
            <td className="text-center">{user.time}</td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(user.id, 'add')}>
                <FontAwesomeIcon icon={faPlus} className="h-5 m-auto" />
            </td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(user.id, 'minus')}>
                <FontAwesomeIcon icon={faMinus} className="h-5 m-auto" />
            </td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(user.id, 'remove')}>
                <FontAwesomeIcon icon={faTrashCan} className="h-5 m-auto" />
            </td>
        </tr>
    ));
    return <tbody>{sparesTable}</tbody>;
};

export default UsersAddRemoveTable;
