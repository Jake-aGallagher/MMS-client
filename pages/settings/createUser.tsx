import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import axios from 'axios';

interface ModalProps {
    closeModal: () => void;
}

const CreateUser = (props: ModalProps) => {
    const authLevel = useSelector((state: RootState) => state.user.value.authority);
    const [authOptions, setAuthOptions] = useState(['']);
    const [auth, setAuth] = useState(authLevel == 4 ? 'Admin' : 'Engineer');
    const [username, setUsername] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [password, setPassword] = useState('');
    const [retyped, setRetyped] = useState('');

    useEffect(() => {
        if (authLevel == 4) {
            setAuthOptions(['Admin', 'Manager', 'Engineer', 'Staff']);
        } else {
            setAuthOptions(['Engineer', 'Staff']);
        }
    }, []);

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3001/users',
                {
                    username: username,
                    first: first,
                    last: last,
                    password: password,
                    auth: auth,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert('There has been an issue creating this User, please try again.');
            }
        } catch (err) {
            alert('There has been an issue creating this User, please try again.');
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Create New User</h1>
            <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="firstname">First Name:</label>
                <input id="firstname" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setFirst(e.target.value)} />

                <label htmlFor="lastname">Last Name:</label>
                <input id="lastname" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setLast(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input id="password" type="password" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="retypepassword">Re-Enter Password:</label>
                <input id="retypepassword" type="password" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setRetyped(e.target.value)} />

                <label htmlFor="auth">User Authority Level:</label>
                <select id="auth" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setAuth(e.target.value)} defaultValue={auth}>
                    {authOptions.map((authOption) => (
                        <option value={authOption} key={authOption}>
                            {authOption}
                        </option>
                    ))}
                </select>

                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button
                        className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                        onClick={props.closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                        onClick={submitHandler}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
