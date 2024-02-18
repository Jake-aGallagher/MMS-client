import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import bgImg from '../../public/stock-vector-gear-blueprint-technical-background-cogs-and-wheels-in-gray-color-abstract-parts-of-engine-1764788840.jpg';
import LogoWithName from '../../public/LogoName.svg';
import { useSearchParams } from 'next/navigation';
import { setDebug } from '../store/debugSlice';
import { setPermissions } from '../store/permissionsSlice';
import LoadingNoDataError from '../loading/loadingNoDataError';

interface Props {
    loginHandler: () => void;
}

const Login = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const debug = searchParams?.get('debug') == process.env.NEXT_PUBLIC_DEBUG_KEY || false;
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
        setLoading(true);
        try {
            const response = await axios.get(`${SERVER_URL}/check-auth`, {
                headers: { 'Content-Type': 'application/json', Authorisation: 'Bearer ' + localStorage.getItem('token') },
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
                    isAdmin: user.isAdmin,
                })
            );
            dispatch(setPermissions({ permissions: response.data.permissions }));
            localStorage.removeItem('token');
            localStorage.setItem('token', response.data.token);
            props.loginHandler();
        } catch (err) {
            setLoading(false);
        }
    };

    const setErrors = () => {
        setError('username', { type: 'failedLogin', message: 'Login Failed' });
        setError('password', { type: 'failedLogin', message: 'Login Failed' });
    };

    const handleRegistration = async (data: any) => {
        try {
            const reqData = { username: data.username, password: data.password };
            const response = await axios.post(`${SERVER_URL}/users/login`, reqData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
            if (response.data.passedValidation) {
                const user = response.data.user;
                dispatch(
                    setUser({
                        username: user.username,
                        first: user.first,
                        last: user.last,
                        user_group_id: user.user_group_id,
                        id: user.id,
                        isAdmin: response.data.isAdmin,
                    })
                );
                dispatch(setPermissions({ permissions: response.data.permissions }));
                dispatch(setDebug({ debug }));
                localStorage.setItem('token', response.data.token);
                props.loginHandler();
            } else {
                setErrors();
            }
        } catch (err) {
            setErrors();
        }
    };

    return (
        <>
            {loading ? (
                <LoadingNoDataError loading={true} error={false}>
                    <></>
                </LoadingNoDataError>
            ) : (
                <div className="container mx-auto h-screen w-screen flex flex-col justify-center items-center">
                    <img src={bgImg.src} className="fixed w-screen h-screen object-cover" draggable={false} />
                    <img src={LogoWithName.src} className="fixed top-0 left-0 w-44 h-24 m-4" draggable={false} />
                    <form
                        onSubmit={handleSubmit(handleRegistration)}
                        className="rounded-md w-8/12 md:w-1/2 lg:w-1/3 mx-auto bg-secondary flex flex-col justify-center px-4 p-5 shadow-md z-10 opacity-80"
                    >
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
            )}
        </>
    );
};

export default Login;
