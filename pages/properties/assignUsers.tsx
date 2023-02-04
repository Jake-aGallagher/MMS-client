import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/loading/loading';
import RetrieveError from '../../components/error/retrieveError';

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
    const [users, setUsers] = useState<UsersList[]>([]);
    const [assignedUsers, setAssignedUsers] = useState<number[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getUsersForAssign();
    }, []);

    const getUsersForAssign = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/properties/${props.propertyNumber}/users-for-assigning`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setUsers(response.data);
                let alreadyAssigned = [...assignedUsers];
                response.data.map((user: UsersList) => {
                    if (user.assigned == true) {
                        alreadyAssigned.push(user.id);
                    }
                });
                setAssignedUsers(alreadyAssigned);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const inputChangeHandler = (id: number) => {
        if (assignedUsers.includes(id)) {
            const newArr = assignedUsers.filter((user) => user != id);
            setAssignedUsers(newArr);
        } else {
            setAssignedUsers([...assignedUsers, id]);
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                'http://localhost:3001/properties/assign-users',
                {
                    propertyNo: props.propertyNumber,
                    assignedUsers,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert('There has been an issue Assigning Users to this Property, please try again.');
            }
        } catch (err) {
            alert('There has been an issue Assigning Users to this Property, please try again.');
        }
    };

    const inputs = users.map((user) => {
        return (
            <label key={user.username} className="grid overflow-hidden grid-cols-10 grid-rows-1 border-b-2 mb-2">
                <div className="box col-start-1 col-end-9">{user.first_name + ' ' + user.last_name}</div>
                <input
                    type="checkbox"
                    defaultChecked={assignedUsers.includes(user.id)}
                    value={user.id}
                    className="box col-start-9 col-end-10"
                    onChange={() => inputChangeHandler(user.id)}
                />
            </label>
        );
    });

    return (
        <>
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Assign Users</h1>
                    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        {noData ? <div>There are no users</div> : <div className="w-full flex flex-col justify-start pt-2 ">{inputs}</div>}
                        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>
                                Cancel
                            </button>
                            {noData ? (
                                ''
                            ) : (
                                <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={submitHandler}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default AssignUsers;

<div className="h-full w-full rounded-lg relative border-4 border-blue-600">
    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200 border-b-4 border-blue-600">Title Here</h1>
    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="mb-2 rounded-sm bg-blue-200" />

        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full border-t-4 border-blue-600 bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Cancel</button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Submit</button>
        </div>
    </form>
</div>;
