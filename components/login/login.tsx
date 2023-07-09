import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface Props {
    loginHandler: () => void;
    refreshExpiry: () => void;
}

const Login = (props: Props) => {
    const dispatch = useDispatch();
    const formValidation = yup.object().shape({
        username: yup.string().required().max(255),
        password: yup.string().required().min(8).max(45),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(formValidation),
    });

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

    const handleRegistration = async (data: any) => {
        try {
            const response = await axios.post(
                `${SERVER_URL}/users/login`,
                {
                    username: data.username,
                    password: data.password,
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
                localStorage.setItem('token', response.data.response.token);
                props.refreshExpiry();
                props.loginHandler();
            } else {
                setError('username', { type: 'failedLogin', message: 'Login Failed' });
                setError('password', { type: 'failedLogin', message: 'Login Failed' });
            }
        } catch (err) {
            setError('username', { type: 'failedLogin', message: 'Login Failed' });
            setError('password', { type: 'failedLogin', message: 'Login Failed' });
        }
    };

    return (
        <div className="container mx-auto h-screen w-screen flex flex-col justify-center items-center">
            <form
                onSubmit={handleSubmit(handleRegistration)}
                className="rounded-xl w-8/12 md:w-1/2 lg:w-1/3 mx-auto bg-gray-200 font-bold flex flex-col justify-center px-4 space-y-4 border-2 border-blue-600 p-5"
            >
                <label htmlFor="username" className=" ">
                    Username
                </label>
                <input
                    type="text"
                    maxLength={45}
                    id="username"
                    className={`rounded-sm ${(errors.username || errors.password) && 'border-red-600 border-2'}`}
                    {...register('username', { required: true })}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    maxLength={255}
                    id="password"
                    className={`rounded-sm ${(errors.username || errors.password) && 'border-red-600 border-2'}`}
                    {...register('password', { required: true })}
                />

                <button type="submit" className="rounded-3xl bg-gray-200 hover:bg-blue-600 h-8 w-1/3 mx-auto px-2 border-2 border-blue-600 hover:border-transparent">
                    Login
                </button>
                {errors.username || errors.password ? <div className="text-center text-red-600">There has been a problem logging in, please try again</div> : null}
            </form>
        </div>
    );
};

export default Login;
