import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';

interface Props {
    loginHandler: () => void;
    refreshExpiry: () => void
}

const Login = (props: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/check-auth`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorisation: 'Bearer ' + localStorage.getItem('token'),
                },
                withCredentials: true,
            });
            const user = response.data.user;
            dispatch(
                setUser({
                    username: user.username,
                    first: user.first_name,
                    last: user.last_name,
                    authority: user.authority,
                    id: user.id,
                })
            );
            props.loginHandler();
        } catch (err) {}
    };

    const loginHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (username.length > 0 && password.length > 7) {
            try {
                const response = await axios.post(
                    `${SERVER_URL}/users/login`,
                    {
                        username: username,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
                if (response.data.response.passedValidation) {
                    const user = response.data.response.user;
                    dispatch(
                        setUser({
                            username: user.username,
                            first: user.first,
                            last: user.last,
                            authority: user.authority,
                            id: user.id,
                        })
                    );
                    setWarning(false);
                    localStorage.setItem('token', response.data.response.token);
                    props.refreshExpiry()
                    props.loginHandler();
                } else {
                    setPassword('');
                    setWarning(true);
                }
            } catch (err) {
                setPassword('');
                setWarning(true);
            }
        }
    };

    return (
        <div className="container mx-auto h-screen w-screen flex flex-col justify-center items-center">
            <form className="rounded-xl w-8/12 md:w-1/2 lg:w-1/3 mx-auto bg-gray-200 font-bold flex flex-col justify-center px-4 space-y-4 border-2 border-blue-600 p-5">
                <label htmlFor="usernameLogin" className=" ">
                    Username
                </label>
                <input type="text" name="username" maxLength={45} id="usernameLogin" onChange={(e) => setUsername(e.target.value)} className="rounded-sm" />

                <label htmlFor="passwordLogin">Password</label>
                <input type="password" name="password" maxLength={255} id="passwordLogin" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-sm" />

                <button
                    type="submit"
                    onClick={loginHandler}
                    className="rounded-3xl bg-gray-200 hover:bg-blue-600 h-8 w-1/3 mx-auto px-2 border-2 border-blue-600 hover:border-transparent"
                >
                    Login
                </button>
                {warning ? <div className="text-center text-red-600">There has been a problem logging in, please try again</div> : null}
            </form>
        </div>
    );
};

export default Login;
