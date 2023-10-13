import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import bgImg from '../../public/stock-vector-gear-blueprint-technical-background-cogs-and-wheels-in-gray-color-abstract-parts-of-engine-1764788840.jpg';
import { useSearchParams } from 'next/navigation';
import { setDebug } from '../store/debugSlice';

interface Props {
    loginHandler: () => void;
    refreshExpiry: () => void;
}

const Login = (props: Props) => {
    const searchParams = useSearchParams();
    const debug = searchParams.get('debug') == process.env.NEXT_PUBLIC_DEBUG_KEY || false;
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
                    user_group_id: user.user_group_id,
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
                        user_group_id: user.user_group_id,
                        id: user.id,
                    })
                );
                if (debug) {
                    dispatch(setDebug({ debug: true }));
                }
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
            <img src={bgImg.src} className="fixed w-screen h-screen object-cover" draggable={false} />
            <form onSubmit={handleSubmit(handleRegistration)} className="rounded-md w-8/12 md:w-1/2 lg:w-1/3 mx-auto bg-secondary flex flex-col justify-center px-4 p-5 shadow-lg z-10 opacity-80">
                <div className="flex flex-col mx-1 relative mb-2">
                    <label htmlFor="username" className="text-sm absolute ml-3 px-1 -top-1 z-10 bg-secondary">
                        Username
                    </label>
                    <input
                        type="text"
                        maxLength={45}
                        id="username"
                        className={`h-10 pl-1 my-2 rounded-md w-full border-1 bg-secondary border-primary border-solid ${(errors.username || errors.password) && 'border-red border-2'}`}
                        {...register('username', { required: true })}
                    />
                </div>

                <div className="flex flex-col mx-1 relative mb-2">
                    <label htmlFor="password" className="text-sm absolute ml-3 px-1 -top-1 z-10 bg-secondary">
                        Password
                    </label>
                    <input
                        type="password"
                        maxLength={255}
                        id="password"
                        className={`h-10 pl-1 my-2 rounded-md w-full border-1 bg-secondary border-primary border-solid ${(errors.username || errors.password) && 'border-red border-2'}`}
                        {...register('password', { required: true })}
                    />
                </div>

                <button type="submit" className="btnBlue h-8 mx-auto w-32">
                    Login
                </button>
                {errors.username || errors.password ? <div className="text-center text-red">There has been a problem logging in, please try again</div> : null}
            </form>
        </div>
    );
};

export default Login;
